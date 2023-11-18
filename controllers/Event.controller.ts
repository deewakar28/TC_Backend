import { Response } from "express";
import {
  RoboSoccerModel,
  BGMIModel,
  AerofiliaModel,
  LogoDesignModel,
  CircuitrixModel,
  ValorantModel,
  AutocadModel,
  testModel,
  TerrainTreaderModel,
} from "../models/Events.model";
import { CustomRequest } from "..";

const specialCharacterPattern = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|/]/;
type IntegrityErrorType = {
  code: number;
  index: number;
  keyPattern: {[key: string]: number};
  keyValue: {[key: string]: number};
};

const testreg = async (data: { [key: string]: string }, res: Response) => {
  const formData = new testModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res.status(405).json({
      ok: false,
      message: "Error validating form data",
      error: error,
    });
  }
  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const TerrainTreader = async (data: { [key: string]: string }, res: Response) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new TerrainTreaderModel(data);
  try {
    await formData.validate();
  }
  catch (error) {
    return res.status(405).json({
      ok: false,
      message: "Error validating form data",
      error: error,
    });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const RoboSoccer = async (data: { [key: string]: string }, res: Response) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new RoboSoccerModel(data);
  try {
    await formData.validate();
  }
  catch (error) {
    return res.status(405).json({
      ok: false,
      message: "Error validating form data",
      error: error,
    });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const register_bgmi = async (req: CustomRequest, res: Response): Promise<Response> => {
  const admin = req.admin!;
  const data = req.body;
  const file = req.file;
  delete data.file;
  data.Team_key = data.Team_name.toUpperCase();

  if (specialCharacterPattern.test(data.Team_name)) {
    return res.status(405).json({
      ok: false,
      message: "Team name can't contain special characters",
    });
  }

  if (!file) {
    return res
      .status(405)
      .json({ ok: false, message: "Please upload the payment screenshot" });
  }

  try {
    const bucket = admin.storage().bucket();
    const folderPath = `${process.env.DB}/BGMI/Payments/${data.Team_key}/`;
    const fileName = `${file.originalname}`;
    const fileUpload = bucket.file(`${folderPath}${fileName}`);

    await fileUpload.save(file.buffer, {
      contentType: file.mimetype,
    });

    const [url] = await fileUpload.getSignedUrl({
      action: "read",
      expires: "03-09-2024",
    });
    data["payment"] = url;
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Error uploading image", error: err });
  }

  // saving the team data to mongodb
  const formData = new BGMIModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res.status(405).json({
      ok: false,
      message: "Error while validating form data",
      error: error,
    });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Aerofilia = async (data: { [key: string]: string }, res: Response) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new AerofiliaModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res.status(405).json({
      ok: false,
      message: "Error while validating form data",
      error: error,
    });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const LogoDesign = async (data: { [key: string]: string }, res: Response) => {
  const formData = new LogoDesignModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Error validating form data", error: error });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Circuitrix = async (data: { [key: string]: string }, res: Response) => {
  const formData = new CircuitrixModel(data);
  try {
    await formData.validate();
  } catch (error) {
    console.log(error);
    return res
      .status(405)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Valorant = async (data: { [key: string]: string }, req: CustomRequest, res: Response) => {
  data.Team_key = data.Team_name.toUpperCase();
  const file = req.file;
  delete data.file;

  if (specialCharacterPattern.test(data.Team_key)) {
    return res.status(405).json({
      ok: false,
      message: "Team name can't contain special characters",
    });
  }

  if (!file) {
    return res
      .status(405)
      .json({ ok: false, message: "Please upload the payment screenshot" });
  }

  const formData = new ValorantModel(data);
  try {
    await formData.validate();
  } catch (error) {
    console.log(error);
    return res
      .status(405)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Autocad = async (data: { [key: string]: string }, res: Response) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new AutocadModel(data);

  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }

  try {
    await formData.save();
    return res.status(200).json({ ok: true, message: "Registered Successfully" });
  }
  catch (error: any) {
    if ("code" in error && "keyPattern" in error) {
      const err: IntegrityErrorType = error as IntegrityErrorType;
      if (err.code === 11000) {
        const keys = Object.keys(err.keyPattern);
        return res.status(405).json({ ok: false, message: `${keys[0]} must be unique`, error: error });
      }
    }
    return res.status(500).json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Register = async (req: CustomRequest, res: Response) => {
  const event = req.query.event;
  const data: { [key: string]: string } = req.body;

  if (event === "terrainTreader") {
    await TerrainTreader(data, res);
  } else if (event === "RoboSoccer") {
    await RoboSoccer(data, res);
  } else if (event === "aerofilia") {
    await Aerofilia(data, res);
  } else if (event === "LogoDesign") {
    await LogoDesign(data, res);
  } else if (event === "Circuitrix") {
    await Circuitrix(data, res);
  } else if (event === "valo") {
    await Valorant(data, req, res);
  } else if (event === "autocad") {
    await Autocad(data, res);
  } else if (event === "test") {
    await testreg(data, res);
  } else return res.status(200);
};

export { Register, register_bgmi };
