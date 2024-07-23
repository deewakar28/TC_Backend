import mongoose from "mongoose";

const VigyaanProblemCodeSchema = new mongoose.Schema({
  Code: {
    type: String,
    unique: true,
    trim: true,
  },
});

const VigyaanRegisSchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  isNITRR: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_year: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  Leader_college: {
    type: String,
    trim: true,
  },
  Member2_name: {
    type: String,
    required: true,
    trim: true,
  },
  Member2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Member2_year: {
    type: String,
    required: true,
    trim: true,
  },
  Member2_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Member2_email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  Member2_college: {
    type: String,
    trim: true,
  },
  Member2_rollNo: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  Member3_name: {
    type: String,
    trim: true,
  },
  Member3_whatsapp: {
    type: String,
    trim: true,
    unique: true,
  },
  Member3_email: {
    type: String,
    trim: true,
    unique: true,
  },
  Member3_year: {
    type: String,
    trim: true,
  },
  Member3_rollNo: {
    type: String,
    trim: true,
    unique: true,
  },
  Member3_college: {
    type: String,
    trim: true,
  },
  Member3_branch: {
    type: String,
    trim: true,
  },
  Problem_code: {
    type: String,
    trim: true,
    required: true,
  },
});
const TerrainTreaderSchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true,
  },
});

const RoboSoccerSchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true,
  },
});

const BGMISchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_email: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_college: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_Game_Name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_id: {
    type: String,
    required: true,
    trim: true,
  },
  P2_name: {
    type: String,
    trim: true,
  },
  P2_id: {
    type: String,
    trim: true,
  },
  P2_number: {
    type: String,
    trim: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
  P3_id: {
    type: String,
    trim: true,
  },
  P3_number: {
    type: String,
    trim: true,
  },
  P4_name: {
    type: String,
    trim: true,
  },
  P4_id: {
    type: String,
    trim: true,
  },
  P4_number: {
    type: String,
    trim: true,
  },
  P5_name: {
    type: String,
    trim: true,
  },
  P5_id: {
    type: String,
    trim: true,
  },
  P5_number: {
    type: String,
    trim: true,
  },
  payment: {
    type: String,
    required: true,
  },
});

const AEROFILIA = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_college: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true,
  },
  P2_name: {
    type: String,
    required: true,
    trim: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
});

const LogoDesign = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  College: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Branch: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Year: {
    type: String,
    required: true,
    trim: true,
  },
  Roll_Number: {
    type: String,
    required: true,
    trim: true,
  },
  Software_Used: {
    type: String,
    required: true,
    trim: true,
  },
  Prior_Experience: {
    type: String,
    trim: true,
  },
});

const CircuitrixSchema = new mongoose.Schema({
  Participant_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  College: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Branch: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  YOG: {
    type: String,
    required: true,
    trim: true,
  },
  Roll_number: {
    type: String,
    required: true,
    trim: true,
  },
});

const ValorantSchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_college: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_game_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P2_game_id: {
    type: String,
    trim: true,
    unique: true,
  },
  P2_number: {
    type: String,
    trim: true,
    unique: true,
  },
  P3_game_id: {
    type: String,
    trim: true,
    unique: true,
  },
  P3_number: {
    type: String,
    trim: true,
    unique: true,
  },
  P4_game_id: {
    type: String,
    trim: true,
    unique: true,
  },
  P4_number: {
    type: String,
    trim: true,
    unique: true,
  },
  P5_game_id: {
    type: String,
    trim: true,
    unique: true,
  },
  P5_number: {
    type: String,
    trim: true,
    unique: true,
  },
  // Payment: {
  //   type: String,
  //   required: true,
  // },
});

const AutocadSchema = new mongoose.Schema({
  Team_key: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  Team_name: {
    type: String,
    trim: true,
    required: true,
  },
  Leader_name: {
    type: String,
    trim: true,
    required: true,
  },
  Leader_whatsapp: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  Leader_college: {
    type: String,
    trim: true,
    required: true,
  },
  Leader_branch: {
    type: String,
    trim: true,
    required: true,
  },
  Leader_yog: {
    type: String,
    trim: true,
    required: true,
  },
  P2_name: {
    type: String,
    trim: true,
    required: true,
  },
  P2_branch: {
    type: String,
    trim: true,
    required: true,
  },
  P2_yog: {
    type: String,
    trim: true,
    required: true,
  },
  P2_number: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  P3_name: {
    type: String,
    trim: true,
    required: true,
  },
  P3_branch: {
    type: String,
    trim: true,
    required: true,
  },
  P3_yog: {
    type: String,
    trim: true,
    required: true,
  },
  P3_number: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
});

const testModel = mongoose.model("Test", testSchema, "Test_reg");

const RoboSoccerModel = mongoose.model(
  "RoboSoccer",
  RoboSoccerSchema,
  "RoboSoccer_registration"
);

const BGMIModel = mongoose.model("BGMI", BGMISchema, "BGMI_registration");

const AerofiliaModel = mongoose.model(
  "Aerofilia",
  AEROFILIA,
  "Aerofilia_registration"
);

const LogoDesignModel = mongoose.model(
  "LogoDesign",
  LogoDesign,
  "LogoDesign_registration"
);

const CircuitrixModel = mongoose.model(
  "Circuitrix",
  CircuitrixSchema,
  "Circuitrix_registration"
);

const ValorantModel = mongoose.model(
  "Valorant",
  ValorantSchema,
  "Valorant_registration"
);

const AutocadModel = mongoose.model(
  "Autocad",
  AutocadSchema,
  "Autocad_registration"
);
const VigyaanModel = mongoose.model(
  "Vigyaan",
  VigyaanRegisSchema,
  "Vigyaan_registration"
);
const VigyaanProblemCodeModel = mongoose.model(
  "VigyaanProblem",
  VigyaanProblemCodeSchema,
  "VigyaanProblemCode"
);

const TerrainTreaderModel = mongoose.model(
  "TerrainTreader",
  TerrainTreaderSchema,
  "TerrainTreader_Registration"
);

export {
  RoboSoccerModel,
  BGMIModel,
  AerofiliaModel,
  LogoDesignModel,
  CircuitrixModel,
  ValorantModel,
  AutocadModel,
  TerrainTreaderModel,
  VigyaanModel,
  VigyaanProblemCodeModel,
  testModel,
};
