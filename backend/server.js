const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory database
const students = [];

// GET API to fetch all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// POST API to add student
app.post("/api/students", (req, res) => {
  const student = req.body;

  if (!student.firstName || !student.lastName || !student.course || !student.dob) {
    return res.status(400).json({ error: "All fields are required." });
  }

  students.push(student);
  res.status(201).json({ message: "Student added successfully!" });
});

// DELETE API to remove student 
app.delete("/api/students/:index", (req, res) => {
    const { index } = req.params;
  
    if (index < 0 || index >= students.length) {
      return res.status(404).json({ error: "Student not found." });
    }
  
    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully!" });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
