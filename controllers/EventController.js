const {
  RoboSoccerModel,
  BGMIModel,
  AerofiliaModel,
  LogoDesignModel,
  CircuitrixModel,
  ValorantModel,
  AutocadModel,
  CodeMimeQuestModel,
  TalentShowModel,
  SpeedCubingModel,
  TreasureHuntModel,
  ReactionRacingModel,
  SurvivalModel,
  EcopolisModel,
  MechanicalJunkyardModel,
  HydroliftModel,
} = require("../models/Events");

const TerrainTreader = async (db, data, res) => {
  try {
    const collection = db.collection("terrainTreader_registration");
    const present = await collection.findOne({ Team_name: data["Team_name"] });
    const present1 = await collection.findOne({
      Leader_whatsapp: data["Leader_whatsapp"],
    });
    if (!present && !present1) {
      await collection.insertOne(data);
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      if (present)
        return res
          .status(400)
          .json({ ok: false, message: "Team name is already taken" });
      return res.status(400).json({
        ok: false,
        message: "Member with same whatsapp number exists",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const RoboSoccer = async (db, data, res) => {
  try {
    const formData = new RoboSoccerModel(data);
    await formData.validate();

    const coll = db.collection("RoboSoccer_registration");
    const teamNamePresent = await coll.findOne({ Team_name: data.Team_name });
    if (teamNamePresent) {
      return res
        .status(400)
        .json({ ok: false, message: "Team name is already taken" });
    }
    const leaderPresent = await coll.findOne({
      Leader_whatsapp: data.Leader_whatsapp,
    });
    if (leaderPresent) {
      return res.status(400).json({
        ok: false,
        message: "Member with same whatsapp number exists",
      });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

async function check_number_presence(number, collection) {
  const c1 = await collection.findOne({ Leader_whatsapp: number });
  const c2 = await collection.findOne({ P2_number: number });
  const c3 = await collection.findOne({ P3_number: number });
  const c4 = await collection.findOne({ P4_number: number });
  const c5 = await collection.findOne({ P5_number: number });
  return c1 == null && c2 == null && c3 == null && c4 == null && c5 == null;
}

async function is_player_id_present(pid, collection) {
  const c1 = await collection.findOne({ Leader_game_id: pid });
  if (c1) return c1;
  const c2 = await collection.findOne({ P2_game_id: pid });
  if (c2) return c2;
  const c3 = await collection.findOne({ P3_game_id: pid });
  if (c3) return c3;
  const c4 = await collection.findOne({ P4_game_id: pid });
  if (c4) return c4;
  const c5 = await collection.findOne({ P5_game_id: pid });
  if (c5) return c5;
}

const register_bgmi = async (req, res) => {
  const db = req.db;
  const admin = req.admin;
  const data = req.body;
  const file = req.file;
  const coll = db.collection("BGMI_Registration");
  delete data.file;

  data.Team_key = data.Team_name.toUpperCase();
  var specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
  if (specialCharacterPattern.test(data.Team_name)) {
    return res.status(405).json({
      ok: false,
      message: "Team name can't contain special characters",
    });
  }

  const teamNamePresent = await coll.findOne({ Team_key: data.Team_key });
  if (teamNamePresent) {
    return res
      .status(405)
      .json({ ok: false, message: "Team name is already taken" });
  }

  if (!(await check_number_presence(data.Leader_whatsapp, coll))) {
    return res.status(405).json({
      ok: false,
      message: `Leader(${Leader_whatsapp}) is already in a team`,
    });
  }
  if (
    data.P2_number !== "" &&
    !(await check_number_presence(data.P2_number, coll))
  ) {
    return res.status(405).json({
      ok: false,
      message: `P2(${data.P2_number}) is already in a team`,
    });
  }
  if (
    data.P3_number !== "" &&
    !(await check_number_presence(data.P3_number, coll))
  ) {
    return res.status(405).json({
      ok: false,
      message: `P3(${data.P3_number}) is already in a team`,
    });
  }
  if (
    data.P4_number !== "" &&
    !(await check_number_presence(data.P4_number, coll))
  ) {
    return res.status(405).json({
      ok: false,
      message: `P4(${data.P4_number}) is already in a team`,
    });
  }
  if (
    data.P5_number !== "" &&
    !(await check_number_presence(data.P5_number, coll))
  ) {
    return res.status(405).json({
      ok: false,
      message: `P5(${data.P5_number}) is already in a team`,
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
    return res.status(500).json({
      ok: false,
      message: "Error while validating form data",
      error: error,
    });
  }

  try {
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Aerofilia = async (db, data, res) => {
  try {
    data.Team_key = data.Team_name.toUpperCase();
    const formData = new AerofiliaModel(data);
    await formData.validate();

    const coll = db.collection("Aerofilia_registration");
    const teamNamePresent = await coll.findOne({ Team_key: data.Team_key });
    if (teamNamePresent) {
      return res
        .status(405)
        .json({ ok: false, message: "Team name is already taken" });
    }
    const leaderPresent = await coll.findOne({
      Leader_whatsapp: data.Leader_whatsapp,
    });
    if (leaderPresent) {
      return res.status(405).json({
        ok: false,
        message: "Member with same whatsapp number exists",
      });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const LogoDesign = async (db, data, res) => {
  const formData = new LogoDesignModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Error validating form data", error: error });
  }

  try {
    const coll = db.collection("LogoDesign_registration");
    const emailPresent = await coll.findOne({ Email: data.Email });
    if (emailPresent) {
      return res
        .status(405)
        .json({ ok: false, message: "Email is already registered" });
    }
    const phonePresent = await coll.findOne({ Whatsapp: data.Whatsapp });
    if (phonePresent) {
      return res.status(405).json({
        ok: false,
        message: "Member with the same phone number exists",
      });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Circuitrix = async (db, data, res) => {
  console.log(data);
  const formData = new CircuitrixModel(data);
  try {
    await formData.validate();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
  try {
    const coll = db.collection("Circuitrix_registration");
    const PhonePresent = await coll.findOne({
      Whatsapp: data.Whatsapp,
    });
    if (PhonePresent) {
      return res.status(400).json({
        ok: false,
        message: "Member with same Phone number exists",
      });
    }
    const EmailPresent = await coll.findOne({
      Email: data.Email,
    });
    if (EmailPresent) {
      return res.status(400).json({
        ok: false,
        message: "Member with same Email exists",
      });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Valorant = async (db, data, req, res) => {
  data.Team_key = data.Team_name.toUpperCase();
  // const file = req.file;
  // delete data.file;

  var specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/;
  if (specialCharacterPattern.test(data.Team_name)) {
    return res.status(405).json({
      ok: false,
      message: "Team name can't contain special characters",
    });
  }

  // if (!file) {
  //   return res
  //     .status(405)
  //     .json({ ok: false, message: "Please upload the payment screenshot" });
  // }

  const coll = db.collection("Valorant_registration");
  try {
    const teamNamePresent = await coll.findOne({ Team_key: data.Team_key });
    if (teamNamePresent) {
      return res
        .status(405)
        .json({ ok: false, message: "Team name is already taken" });
    }

    if (await is_player_id_present(data.Leader_game_id, coll)) {
      return res.status(405).json({
        ok: false,
        message: `Leader ID: (${data.Leader_game_id}) is already in a team`,
      });
    }
    if (
      data.P2_game_id !== "" &&
      (await is_player_id_present(data.P2_game_id, coll))
    ) {
      return res.status(405).json({
        ok: false,
        message: `P2: (${data.P2_game_id}) is already in a team`,
      });
    }
    if (
      data.P3_game_id !== "" &&
      (await is_player_id_present(data.P3_game_id, coll))
    ) {
      return res.status(405).json({
        ok: false,
        message: `P3: (${data.P3_game_id}) is already in a team`,
      });
    }
    if (
      data.P4_game_id !== "" &&
      (await is_player_id_present(data.P4_game_id, coll))
    ) {
      return res.status(405).json({
        ok: false,
        message: `P4: (${data.P4_game_id}) is already in a team`,
      });
    }
    if (
      data.P5_game_id !== "" &&
      (await is_player_id_present(data.P5_game_id, coll))
    ) {
      return res.status(405).json({
        ok: false,
        message: `P5: (${data.P5_game_id}) is already in a team`,
      });
    }
    // try {
    //   const admin = req.admin;
    //   const bucket = admin.storage().bucket();
    //   const folderPath = `${process.env.DB}/Valorant/Payments/${data.Team_key}/`;
    //   const fileName = `${file.originalname}`;
    //   const fileUpload = bucket.file(`${folderPath}${fileName}`);

    //   await fileUpload.save(file.buffer, {
    //     contentType: file.mimetype,
    //   });

    //   const [url] = await fileUpload.getSignedUrl({
    //     action: "read",
    //     expires: "03-09-2024",
    //   });
    //   data["Payment"] = url;
    // } catch (err) {
    //   return res
    //     .status(500)
    //     .json({ ok: false, message: "Error uploading image", error: err });
    // }
    const formData = new ValorantModel(data);
    try {
      await formData.validate();
    } catch (error) {
      return res.status(405).json({
        ok: false,
        message: "Error while validating data",
        error: error,
      });
    }

    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

async function check_number(number, collection) {
  const c1 = await collection.findOne({ Leader_whatsapp: number });
  const c2 = await collection.findOne({ P2_number: number });
  const c3 = await collection.findOne({ P3_number: number });

  return c1 == null && c2 == null && c3 == null;
}
const Autocad = async (db, data, res) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new AutocadModel(data);
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
    const coll = db.collection("Autocad_registration");
    const teamNamePresent = await coll.findOne({ Team_key: data.Team_key });
    if (teamNamePresent) {
      return res
        .status(405)
        .json({ ok: false, message: "Team name is already taken" });
    }
    const leaderPresent = await coll.findOne({
      Leader_whatsapp: data.Leader_whatsapp,
    });
    if (!(await check_number(data.Leader_whatsapp, coll))) {
      return res.status(405).json({
        ok: false,
        message: `Leader(${Leader_whatsapp}) is already in a team`,
      });
    }

    if (data.P2_number !== "" && !(await check_number(data.P2_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P2_number}) is already in a team`,
      });
    }
    if (data.P3_number !== "" && !(await check_number(data.P3_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P3(${data.P3_number}) is already in a team`,
      });
    }

    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const CodeMime = async (db, data, res) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new CodeMimeQuestModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
  try {
    const coll = db.collection("CodeMime_registration");
    const teamNamePresent = await coll.findOne({ Team_key: data.Team_key });
    if (teamNamePresent) {
      return res
        .status(405)
        .json({ ok: false, message: "Team name is already taken" });
    }
    const leaderPresent = await coll.findOne({
      Leader_whatsapp: data.Leader_whatsapp,
    });
    if (leaderPresent) {
      return res.status(405).json({
        ok: false,
        message: "Member with same Whatsapp number exists",
      });
    }

    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const TalentShow = async (db, data, res) => {
  const formData = new TalentShowModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Error validating form data", error: error });
  }
  try {
    const coll = db.collection("TalentShow_registration");
    const leaderPresent = await coll.findOne({
      P1_whatsapp: data.P1_whatsapp,
    });
    if (leaderPresent) {
      return res.status(405).json({
        ok: false,
        message: "Member with same Phone Number exists",
      });
    }
    if (
      data.P2_whatsapp !== "" &&
      (await coll.findOne({ P2_whatsapp: data.P2_whatsapp }))
    ) {
      return res.status(405).json({
        ok: false,
        message: `P2 (${data.P2_whatsapp}) is already in a team`,
      });
    }
    if (
      data.P3_whatsapp !== "" &&
      (await coll.findOne({ P3_whatsapp: data.P3_whatsapp }))
    ) {
      return res.status(405).json({
        ok: false,
        message: `P3 (${data.P3_rollno}) is already in a team`,
      });
    }
    if (
      data.P4_whatsapp !== "" &&
      (await coll.findOne({ P4_whatsapp: data.P4_whatsapp }))
    ) {
      return res.status(405).json({
        ok: false,
        message: `P4 (${data.P4_rollno}) is already in a team`,
      });
    }

    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const SpeedCubing = async (db, data, res) => {
  const formData = new SpeedCubingModel(data);
  try {
    await formData.validate();
  } catch (error) {
    console.log(error);
    return res
      .status(405)
      .json({ ok: false, message: "Error validating form", error: error });
  }
  try {
    const coll = db.collection("SpeedCubing_registration");
    const PhonePresent = await coll.findOne({
      Phone: data.Phone,
    });
    if (PhonePresent) {
      return res.status(400).json({
        ok: false,
        message: "Participant with same Phone number exists",
      });
    }
    const EmailPresent = await coll.findOne({
      Email: data.Email,
    });
    if (EmailPresent) {
      return res.status(400).json({
        ok: false,
        message: "Participant with same Email exists",
      });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};
const TreasureHunt = async (db, data, res) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new TreasureHuntModel(data);
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
    const coll = db.collection("TreasureHunt_registration");
    const teamNamePresent = await coll.findOne({ Team_key: data.Team_key });
    if (teamNamePresent) {
      return res
        .status(405)
        .json({ ok: false, message: "Team name is already taken" });
    }
    if (!(await check_number_presence(data.Leader_whatsapp, coll))) {
      return res.status(405).json({
        ok: false,
        message: `Leader(${data.Leader_whatsapp}) is already in a team`,
      });
    }

    if (data.P2_number !== "" && !(await check_number_presence(data.P2_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P2_number}) is already in a team`,
      });
    }
    if (data.P3_number !== "" && !(await check_number_presence(data.P3_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P3(${data.P3_number}) is already in a team`,
      });
    }
    if (data.P4_number !== "" && !(await check_number_presence(data.P4_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P4(${data.P4_number}) is already in a team`,
      });
    }
    if (data.P5_number !== "" && !(await check_number_presence(data.P5_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P5(${data.P5_number}) is already in a team`,
      });
    }

    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Survival = async (db, data, res) => {
  const formData = new SurvivalModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Error validating form data", error: error });
  }

  try {
    const coll = db.collection("Survival_registration");

    async function check_mail(mail, collection) {
      const c1 = await collection.findOne({ Leader_email: mail });
      const c2 = await collection.findOne({ P2_email: mail });
      return c1 == null && c2 == null;
    }
    if (!(await check_mail(data.Leader_email, coll))) {
      return res
        .status(405)
        .json({ ok: false, message: "Leader's email is already registered" });
    }
    if (!(await check_mail(data.P2_email, coll))) {
      return res
        .status(405)
        .json({ ok: false, message: "Email id of Player2 is already registered" });
    }
    async function check_number(number, collection) {
      const c1 = await collection.findOne({ Leader_whatsapp: number });
      const c2 = await collection.findOne({ P2_number: number });
      return c1 == null && c2 == null;
    }
    if (
      data.Leader_whatsapp !== "" &&
      !(await check_number(data.Leader_whatsapp, coll))
    ) {
      return res.status(405).json({
        ok: false,
        message: `Leader(${data.Leader_whatsapp}) is already in a team`,
      });
    }
    if (data.P2_number !== "" && !(await check_number(data.P2_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P2_number}) is already in a team`,
      });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};
const ReactionRacing = async (db, data, res) => {
  const formData = new ReactionRacingModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Error validating form data", error: error });
  }

  try {
    const coll = db.collection("ReactionRacing_registration");

    async function check_mail(mail, collection) {
      const c1 = await collection.findOne({ Leader_email: mail });
      const c2 = await collection.findOne({ P2_email: mail });
      return c1 == null && c2 == null;
    }
    if (!(await check_mail(data.Leader_email, coll))) {
      return res
        .status(405)
        .json({ ok: false, message: "Leader's email is already registered" });
    }
    if (!(await check_mail(data.P2_email, coll))) {
      return res
        .status(405)
        .json({ ok: false, message: "Email id of Player2 is already registered" });
    }
    async function check_number(number, collection) {
      const c1 = await collection.findOne({ Leader_whatsapp: number });
      const c2 = await collection.findOne({ P2_number: number });
      return c1 == null && c2 == null;
    }
    if (
      data.Leader_whatsapp !== "" &&
      !(await check_number(data.Leader_whatsapp, coll))
    ) {
      return res.status(405).json({
        ok: false,
        message: `Leader(${data.Leader_whatsapp}) is already in a team`,
      });
    }
    if (data.P2_number !== "" && !(await check_number(data.P2_number, coll))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P2_number}) is already in a team`,
      });
    }
    const result = await coll.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const Ecopolis = async (db, data, res) => {
  const formData = new EcopolisModel(data);
  try {
    await formData.validate();
  } catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Error validating form data", error: error });
  }

  try {
    const collection = db.collection("Ecopolis_registration");
    const present = await collection.findOne({ Team_name: data["Team_name"] });
    if (present)
      return res
        .status(400)
        .json({ ok: false, message: "Team name is already taken" });

    async function check_mail(mail, collection) {
      const c1 = await collection.findOne({ Leader_email: mail });
      return c1 == null;
    }
    if (!(await check_mail(data.Leader_email, collection))) {
      return res
        .status(405)
        .json({ ok: false, message: "Leader's email is already registered" });
    }

    async function check_number(number, collection) {
      const c1 = await collection.findOne({ Leader_whatsapp: number });
      const c2 = await collection.findOne({ P2_number: number });
      const c3 = await collection.findOne({ P3_number: number });
      return c1 == null && c2 == null && c3 == null;
    }
    if (data.Leader_whatsapp !== "" && !(await check_number(data.Leader_whatsapp, collection))) {
      return res.status(405).json({
        ok: false,
        message: `Leader(${data.Leader_whatsapp}) is already in a team`,
      });
    }
    if (data.P2_number !== "" && !(await check_number(data.P2_number, collection))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P2_number}) is already in a team`,
      });
    }
    if (data.P3_number !== "" && !(await check_number(data.P3_number, collection))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P3_number}) is already in a team`,
      });
    }
    const result = await collection.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
};

const MechanicalJunkyard = async (db, data, res) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new MechanicalJunkyardModel(data);
  try {
    await formData.validate();
  }
  catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Please fill the form correctly", error: error });
  }

  try {
    const collection = db.collection("MechanicalJunkyard_Registration");

    async function check_number(number, collection) {
      const c1 = await collection.findOne({ Leader_whatsapp: number });
      const c2 = await collection.findOne({ P2_number: number });
      const c3 = await collection.findOne({ P3_number: number });
      const c4 = await collection.findOne({ P4_number: number });
      return c1 == null && c2 == null && c3 == null && c4 == null;
    }

    if (!(await check_number(data.Leader_whatsapp, collection))) {
      return res.status(405).json({
        ok: false,
        message: `Leader(${data.Leader_whatsapp}) is already in a team`,
      });
    }
    if (!(await check_number(data.P2_number, collection))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P2_number}) is already in a team`,
      });
    }
    if (data.P3_number !== "" && !(await check_number(data.P3_number, collection))) {
      return res.status(405).json({
        ok: false,
        message: `P3(${data.P3_number}) is already in a team`,
      });
    }
    if (data.P4_number !== "" && !(await check_number(data.P4_number, collection))) {
      return res.status(405).json({
        ok: false,
        message: `P4(${data.P4_number}) is already in a team`,
      });
    }

    const result = await collection.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  }
  catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
}

const Hydrolift = async (db, data, res) => {
  data.Team_key = data.Team_name.toUpperCase();
  const formData = new HydroliftModel(data);
  try {
    await formData.validate();
  }
  catch (error) {
    return res
      .status(405)
      .json({ ok: false, message: "Please fill the form correctly", error: error });
  }

  try {
    const collection = db.collection("Hydrolift_Registration");

    async function check_number(number, collection) {
      const c1 = await collection.findOne({ Leader_whatsapp: number });
      const c2 = await collection.findOne({ P2_whatsapp: number });
      const c3 = await collection.findOne({ P3_whatsapp: number });
      return c1 == null && c2 == null && c3 == null;
    }

    if (!(await check_number(data.Leader_whatsapp, collection))) {
      return res.status(405).json({
        ok: false,
        message: `Leader(${data.Leader_whatsapp}) is already in a team`,
      });
    }
    if (!(await check_number(data.P2_whatsapp, collection))) {
      return res.status(405).json({
        ok: false,
        message: `P2(${data.P2_whatsapp}) is already in a team`,
      });
    }
    if (data.P3_whatsapp !== "" && !(await check_number(data.P3_whatsapp, collection))) {
      return res.status(405).json({
        ok: false,
        message: `P3(${data.P3_whatsapp}) is already in a team`,
      });
    }

    const result = await collection.insertOne(formData.toObject());
    if (result.acknowledged) {
      return res
        .status(200)
        .json({ ok: true, message: "Registered Successfully" });
    } else {
      return res.status(400).json({ ok: false, message: "Couldn't Register" });
    }
  }
  catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Internal Server Error", error: error });
  }
}

const Register = async (req, res) => {
  const event = req.query.event;
  const db = req.db;
  const data = req.body;

  if (event === "terrainTreader") {
    await TerrainTreader(db, data, res);
  } else if (event === "RoboSoccer") {
    await RoboSoccer(db, data, res);
  } else if (event === "aerofilia") {
    await Aerofilia(db, data, res);
  } else if (event === "LogoDesign") {
    await LogoDesign(db, data, res);
  } else if (event === "Circuitrix") {
    await Circuitrix(db, data, res);
  } else if (event === "valo") {
    await Valorant(db, data, req, res);
  } else if (event === "autocad") {
    await Autocad(db, data, res);
  } else if (event === "codemime") {
    await CodeMime(db, data, res);
  } else if (event === "talentShow") {
    await TalentShow(db, data, res);
  } else if (event === "speedcubing") {
    await SpeedCubing(db, data, res);
  } else if (event === "speedCubing") {
    await SpeedCubing(db, data, res);
  } else if (event === "TreasureHunt") {
    await TreasureHunt(db, data, res);
  } else if (event === "Survival") {
    await Survival(db, data, res);
  } else if (event === "ReactionRacing") {
    await ReactionRacing(db, data, res);
  } else if (event === "Ecopolis") {
    await Ecopolis(db, data, res);
  } else if (event === "MechanicalJunkyard") {
    await MechanicalJunkyard(db, data, res);
  } else if (event === "Hydrolift") {
    await Hydrolift(db, data, res);
  } else return res.status(200);
};

module.exports = { Register, register_bgmi };
