const mongoose = require("mongoose");
const Symptom = require("./models/Symptom");

mongoose.connect("mongodb://127.0.0.1:27017/medico-redigo")
  .then(async () => {
    console.log("MongoDB Connected");

    // Optional: Clear old data
    await Symptom.deleteMany({});
    console.log("Old symptoms deleted");

    const symptoms = [];

    const problems = [
      "fever", "cold", "cough", "headache", "migraine",
      "allergy", "stomach pain", "vomiting", "diarrhea",
      "back pain", "joint pain", "asthma", "infection"
    ];

    const specialists = [
      "General Physician",
      "Neurologist",
      "Pulmonologist",
      "Gastroenterologist",
      "Orthopedic",
      "Allergist"
    ];

    for (let i = 1; i <= 1000; i++) {
      const problem = problems[i % problems.length];
      const specialist = specialists[i % specialists.length];

      symptoms.push({
        problem: `${problem} ${i}`,  // unique naming
        duration: `${1 + (i % 7)}-5 days`,
        remedy: `Standard treatment plan number ${i}`,
        doctor: {
          name: `Dr. Doctor${i}`,
          specialist: specialist,
          phone: `90000${10000 + i}`
        }
      });
    }

    await Symptom.insertMany(symptoms);

    console.log("1000 symptom records inserted successfully");
    process.exit();
  })
  .catch(err => console.log(err));
