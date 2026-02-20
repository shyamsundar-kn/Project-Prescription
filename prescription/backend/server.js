const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */
mongoose
  .connect("mongodb://mongo-db:27017/medico-redigo")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------------- USER MODEL ---------------- */
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({
      status: "error",
      message: "Invalid credentials",
    });
  }

  res.json({
    status: "success",
    user,
  });
});

/* ---------------- SIGNUP ---------------- */
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({ name, email, password });

  res.json({
    status: "success",
    message: "User created",
  });
});

/* ---------------- REMEDY API ---------------- */
app.get("/symptoms", (req, res) => {
  const { problem } = req.query;

  const remedies = {
    fever: {
      remedy: "Take rest and drink fluids",
      doctor_name: "Dr. Kumar",
      doctor_specialist: "General Physician",
      doctor_phone: "9876543210",
    },
    cold: {
      remedy: "Steam inhalation twice daily",
      doctor_name: "Dr. Meena",
      doctor_specialist: "ENT Specialist",
      doctor_phone: "9876501234",
    },
    headache: {
      remedy: "Hydrate and rest",
      doctor_name: "Dr. Arjun",
      doctor_specialist: "Neurologist",
      doctor_phone: "9123456789",
    },
  };

  const result = remedies[problem?.toLowerCase()];

  if (!result) {
    return res.json({
      status: "notfound",
      message: "No remedy found",
    });
  }

  res.json({
    status: "success",
    data: result,
  });
});

/* ---------------- SERVER ---------------- */
app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
