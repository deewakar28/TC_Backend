import { Db } from "mongodb";
import { CustomRequest } from "..";
import { Response } from "express";
import { Bucket } from "@google-cloud/storage";
import { VigyaanModel, VigyaanProblemCodeModel } from "../models/Events.model";
import { error } from "console";

async function check_number_presence(number: string) {
  const c1 = await VigyaanModel.findOne({ Leader_whatsapp: number });
  const c2 = await VigyaanModel.findOne({ Member2_whatsapp: number });
  const c3 = await VigyaanModel.findOne({ Member3_whatsapp: number });
  return !c1 && !c2 && !c3;
}

async function check_rollNo_presence(number: string) {
  const c1 = await VigyaanModel.findOne({ Leader_rollNo: number });
  const c2 = await VigyaanModel.findOne({ Member2_rollNo: number });
  const c3 = await VigyaanModel.findOne({ Member3_rollNo: number });
  return !c1 && !c2 && !c3;
}

async function check_email_presence(number: string) {
  const c1 = await VigyaanModel.findOne({ Leader_email: number });
  const c2 = await VigyaanModel.findOne({ Member2_email: number });
  const c3 = await VigyaanModel.findOne({ Member3_email: number });
  return !c1 && !c2 && !c3;
}

// async function check_number_presence(number: string, collection: Collection) {
//   const c1 = await collection.findOne({"Leader_whatsapp": number});
//   const c2 = await collection.findOne({"Member2_whatsapp": number});
//   const c3 = await collection.findOne({"Member3_whatsapp": number});
//   return ((c1 == null) && (c2 == null) && (c3 == null));
// }

async function isValidProblem(problem: string) {
  const data = await VigyaanProblemCodeModel.findOne({ Code: problem });
  return data !== null;
}

// async function isValidProblem(problem: string, codes: Collection) {
//   const data = await codes.findOne({"Code": problem});
//   return data !== null;
// }

const vigyaanReg = async (req: CustomRequest, res: Response) => {
  const file = req.file;
  let data = req.body;
  delete data.file;

  data.Team_key = data.Team_name.toUpperCase();
  const specialCharacterPattern = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|/]/;
  if (specialCharacterPattern.test(data.Team_name)) {
    res.status(405).json({
      ok: false,
      message: "Team name can't contain special characters",
    });
  }

  if (!(await check_number_presence(data.Leader_whatsapp))) {
    return res
      .status(405)
      .json({ ok: false, message: "Leader is already in a team" });
  }
  if (!(await check_number_presence(data.Member2_whatsapp))) {
    return res
      .status(405)
      .json({ ok: false, message: "Member 2 is already in a team" });
  }
  if (
    data.Member3_whatsapp &&
    !(await check_number_presence(data.Member3_whatsapp))
  ) {
    return res
      .status(405)
      .json({ ok: false, message: "Member 3 is already in a team" });
  }

  if (!(await check_email_presence(data.Leader_email))) {
    return res.status(405).json({
      ok: false,
      message: "Leader with given email is already in a team",
    });
  }
  if (!(await check_email_presence(data.Member2_email))) {
    return res.status(405).json({
      ok: false,
      message: "Member 2 with given email is already in a team",
    });
  }
  if (data.Member3_email && !(await check_email_presence(data.Member3_email))) {
    return res.status(405).json({
      ok: false,
      message: "Member 3 with given email is already in a team",
    });
  }

  // if (!(await isValidProblem(data.Problem_code))) {
  //   return res
  //     .status(405)
  //     .json({
  //       ok: false,
  //       message: "Invalid problem code. Please check cases.",
  //     });
  // }

  if (!file) {
    return res.status(405).json({ ok: false, message: "No file uploaded." });
  }

  if (data.isNITRR === "Yes") {
    if (!data.Leader_email || !data.Member2_email) {
      return res
        .status(405)
        .json({ ok: false, message: "College email ID is required" });
    }
  } else if (data.isNITRR === "No") {
    if (
      !data.Leader_email ||
      !data.College_name ||
      !data.Member2_email
    ) {
      return res
        .status(405)
        .json({ ok: false, message: "Email and College name are required" });
    }
  } else {
    return res
      .status(405)
      .json({ ok: false, message: "Invalid College confirmation choice" });
  }

  // uploading the abstract file to firebase storage
  try {
    const admin = req.admin!;
    const bucket = admin.storage().bucket();
    const folderPath = `${process.env.DB}/Vigyaan/ppt/${data.Team_key}/`;
    const fileName = `${file.originalname}`;
    const fileUpload = bucket.file(`${folderPath}${fileName}`);

    await fileUpload.save(file.buffer, {
      contentType: file.mimetype,
    });

    const [url] = await fileUpload.getSignedUrl({
      action: "read",
      expires: "09-09-2024",
    });
    data["Abstract"] = url;
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Error uploading abstract", error: err });
  }

  // saving the team data to mongodb

  try {
    const already = await VigyaanModel.findOne({ Team_key: data.Team_key });
    if (!already) {
      data = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );
      const newRegistration = new VigyaanModel(data);
      await newRegistration.save();
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res
        .status(200)
        .json({ ok: false, message: "The Team name is already taken" });
    }
  } catch (err) {
    const error = err as any;
    if (error.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "All team members must be part of only one team",
        error: err,
      });
    } else {
      return res
        .status(500)
        .json({ ok: false, message: "An unknown error occured", error: err });
    }
  }

  // try {
  //   const collection = db.collection("vigyaan_registration");
  //   const already = await collection.findOne({ "Team_key": data.Team_key });
  //   if (!already) {
  //     await collection.insertOne(data);
  //     const present = await collection.findOne(data);
  //     if (present) {
  //       res.status(200).json({ ok: true, message: "Registered Successfully" });
  //     }
  //     else {
  //       res.status(400).json({ ok: false, message: "Couldn't register" });
  //     }
  //   }
  //   else {
  //     res.status(200).json({ ok: false, message: "The Team name is already taken" });
  //   }
  // }
  // catch (err) {
  //   res.status(500).json({ ok: false, message: "Internal Server Error", error: err });
  // }
};

const getFileURL = async (req: CustomRequest, res: Response) => {
  const folders: string[] = [
    "Architecture",
    "BIO-TECHNOLOGY ENGINEERING",
    "BIOMEDICAL ENGINEERING",
    "CHEMICAL ENGINEERING",
    "CIVIL ENGINEERING",
    "CSE_IT_MCA",
    "ELECTRICAL ENGINEERING",
    "ELECTRONICS AND COMMUNICATION ENGINEERING",
    "MECHANICAL ENGINEERING",
    "METALLURGICAL AND MATERIALS ENGINEERING",
    "MINING ENGINEERING",
  ];

  try {
    const db: Db = req.db!;
    let i = 0;
    const result: { [key: string]: string } = {};
    const collection = await db
      .collection("vigyaan_statements")
      .find()
      .toArray();
    collection.map((c) => {
      result[folders[i]] = c[folders[i]];
      i++;
    });
    return res.status(200).json({ ok: true, message: result });
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: err });
  }
};

async function checkPrefixExistence(bucket: Bucket, prefix: string) {
  const [files] = await bucket.getFiles({ prefix });
  return files.length > 0;
}

const changeVigyaanFile = async (req: CustomRequest, res: Response) => {
  const { branch, password } = req.body;
  if (password !== process.env.PASSWORD) {
    return res.status(401).json({ ok: false, message: "Wrong Password" });
  }
  const db: Db = req.db!;
  const admin = req.admin!;
  const collection = db.collection("vigyaan_statements");
  const bucket = admin.storage().bucket();
  const file = req.file;

  if (!file) {
    res.status(400).json({ ok: false, message: "No file found" });
  } else {
    try {
      const prefixToCheck = `${process.env.DB}/Vigyaan/Problem Statements/${branch}/`;
      const prefixExists = await checkPrefixExistence(bucket, prefixToCheck);
      if (prefixExists) {
        await bucket.deleteFiles({
          prefix: `${process.env.DB}/Vigyaan/Problem Statements/${branch}/`,
        });
      }
      const folderPath = `${process.env.DB}/Vigyaan/Problem Statements/${branch}/`;
      const fileName = `${file.originalname}`;
      const fileUpload = bucket.file(`${folderPath}${fileName}`);

      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
      });

      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "09-09-2024",
      });
      const filter = { [branch]: { $exists: true } };
      const update = { $set: { [branch]: url } };

      const result = await collection.updateOne(filter, update);
      if (result.matchedCount === 1) {
        res
          .status(200)
          .json({ ok: true, message: "Document updated successfully." });
      } else {
        res
          .status(400)
          .json({ ok: false, message: "No documents matched the filter." });
      }
    } catch (err) {
      res
        .status(500)
        .json({ ok: false, message: "Internal Server Error", error: err });
    }
  }
};

export { vigyaanReg, getFileURL, changeVigyaanFile };
