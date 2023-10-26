const mongoose = require("mongoose");

const RoboSoccerSchema = new mongoose.Schema({
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

const CodeMimeQuestSchema = new mongoose.Schema({
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
    required: true,
    trim: true,
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
  P2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P2_yog: {
    type: String,
    required: true,
    trim: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
  P3_branch: {
    type: String,
    trim: true,
  },
  P3_yog: {
    type: String,
    trim: true,
  },
});

const TalentShowSchema = new mongoose.Schema({
  P1_name: {
    type: String,
    required: true,
    trim: true,
  },
  P1_rollno: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P1_email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P1_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Performance: {
    type: String,
    required: true,
    trim: true,
  },
  Duration: {
    type: String,
    required: true,
    trim: true,
  },
  P2_name: {
    type: String,
    trim: true,
  },
  P2_rollno: {
    type: String,
    trim: true,
    unique: true,
  },
  P2_whatsapp: {
    type: String,
    trim: true,
    unique: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
  P3_rollno: {
    type: String,
    trim: true,
    unique: true,
  },
  P3_whatsapp: {
    type: String,
    trim: true,
    unique: true,
  },
  P4_name: {
    type: String,
    trim: true,
  },
  P4_rollno: {
    type: String,
    trim: true,
    unique: true,
  },
  P4_whatsapp: {
    type: String,
    trim: true,
    unique: true,
  },
});

const SpeedCubingSchema = new mongoose.Schema({
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
  Phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Additional_phone: {
    type: String,
    trim: true,
  },
  College: {
    type: String,
    required: true,
    trim: true,
  },
  Branch: {
    type: String,
    required: true,
    trim: true,
  },
  YOG: {
    type: String,
    required: true,
    trim: true,
  },
  Preferred_cube_type: {
    type: String,
    required: true,
    trim: true,
  },
  Experience: {
    type: String,
    required: true,
    trim: true,
  },
  Achievements: {
    type: String,
    trim: true,
  },
});
const TreasureHuntSchema = new mongoose.Schema({
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
  P2_number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P2_yog: {
    type: String,
    required: true,
    trim: true,
  },
  P3_name: {
    type: String,
    required: true,
    trim: true,
  },
  P3_number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P3_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P3_yog: {
    type: String,
    required: true,
    trim: true,
  },
  P4_name: {
    type: String,
    required: true,
    trim: true,
  },
  P4_number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P4_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P4_yog: {
    type: String,
    required: true,
    trim: true,
  },
  P5_name: {
    type: String,
    required: true,
    trim: true,
  },
  P5_number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P5_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P5_yog: {
    type: String,
    required: true,
    trim: true,
  },
});
const SurvivalSchema = new mongoose.Schema({
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
  Leader_sem: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_email: {
    type: String,
    required: true,
    trim: true,
  },
  P2_name: {
    type: String,
    required: true,
    trim: true,
  },
  P2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P2_sem: {
    type: String,
    required: true,
    trim: true,
  },
  P2_email: {
    type: String,
    required: true,
    trim: true,
  },
  P2_number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const ReactionRacingSchema = new mongoose.Schema({
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
  Leader_sem: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_email: {
    type: String,
    required: true,
    trim: true,
  },
  P2_name: {
    type: String,
    required: true,
    trim: true,
  },
  P2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P2_sem: {
    type: String,
    required: true,
    trim: true,
  },
  P2_email: {
    type: String,
    required: true,
    trim: true,
  },
  P2_number: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const EcopolisSchema = new mongoose.Schema({
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
  Leader_email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Leader_semester: {
    type: String,
    required: true,
    trim: true,
  },
  P2_name: {
    type: String,
    trim: true,
  },
  P2_number: {
    type: String,
    trim: true,
    unique: true,
  },
  P2_semester: {
    type: String,
    trim: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
  P3_number: {
    type: String,
    trim: true,
    unique: true,
  },
  P3_semester: {
    type: String,
    trim: true,
  },
});

const MechanicalJunkyardSchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true
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
  Leader_branch: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_semester: {
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
    required: true,
    trim: true,
    unique: true,
  },
  P2_name: {
    type: String,
    required: true,
    trim: true,
  },
  P2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P2_semester: {
    type: String,
    required: true,
    trim: true,
  },
  P2_number: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  P2_email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  P3_name: {
    type: String,
    trim: true,
  },
  P3_branch: {
    type: String,
    trim: true,
  },
  P3_semester: {
    type: String,
    trim: true,
  },
  P3_number: {
    type: String,
    trim: true,
    unique: true
  },
  P3_email: {
    type: String,
    trim: true,
    unique: true
  },
  P4_name: {
    type: String,
    trim: true,
  },
  P4_branch: {
    type: String,
    trim: true,
  },
  P4_semester: {
    type: String,
    trim: true,
  },
  P4_number: {
    type: String,
    trim: true,
    unique: true
  },
  P4_email: {
    type: String,
    trim: true,
    unique: true
  }
});

const HydroliftSchema = new mongoose.Schema({
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
  Leader_year: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_college: {
    type: String,
    required: true,
    trim: true,
  },
  P2_name: {
    type: String,
    required: true,
    trim: true,
  },
  P2_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  P2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P2_year: {
    type: String,
    required: true,
    trim: true,
  },
  P2_college: {
    type: String,
    required: true,
    trim: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
  P3_whatsapp: {
    type: String,
    trim: true,
    unique: true,
  },
  P3_branch: {
    type: String,
    trim: true,
  },
  P3_year: {
    type: String,
    trim: true,
  },
  P3_college: {
    type: String,
    trim: true,
  },
});

const HydroliftSchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true
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
    unique: true,
  },
  P2_name: {
    type: String,
    required: true,
    trim: true,
  },
  P2_branch: {
    type: String,
    required: true,
    trim: true,
  },
  P2_yog: {
    type: String,
    required: true,
    trim: true,
  },
  P2_number: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  P2_college: {
    type: String,
    required: true,
    trim: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
  P3_branch: {
    type: String,
    trim: true,
  },
  P3_yog: {
    type: String,
    trim: true,
  },
  P3_number: {
    type: String,
    trim: true,
    unique: true
  },
  P3_college: {
    type: String,
    trim: true,
  },
})

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
const CodeMimeQuestModel = mongoose.model(
  "CodeMime Quest",
  CodeMimeQuestSchema,
  "CodeMime_registration"
);
const TalentShowModel = mongoose.model(
  "Talent Show",
  TalentShowSchema,
  "TalentShow_registration"
);
const SpeedCubingModel = mongoose.model(
  "Speed Cubing",
  SpeedCubingSchema,
  "SpeedCubing_registration"
);
const TreasureHuntModel = mongoose.model(
  "Treasure Hunt",
  TreasureHuntSchema,
  "TreasureHunt_registration"
);
const SurvivalModel = mongoose.model(
  "Survival",
  SurvivalSchema,
  "Survival_registration"
);
const ReactionRacingModel = mongoose.model(
  "Reaction Racing",
  ReactionRacingSchema,
  "ReactionRacing_registration"
);
const EcopolisModel = mongoose.model(
  "Ecopolis Model",
  EcopolisSchema,
  "Ecopolis_registration"
)

const HydroliftModel = mongoose.model("HydroliftModel", HydroliftSchema, "Hydrolift_registration");

const MechanicalJunkyardModel = mongoose.model("MechanicalJunkyardModel", MechanicalJunkyardSchema, "MechanicalJunkyard_Registration")

module.exports = {
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
  HydroliftModel
};
