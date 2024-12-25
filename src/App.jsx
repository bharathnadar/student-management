import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

const API_URL = "https://student-management-backend-c8wr.onrender.com";

const App = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    course: "Select",
    dob: "",
  });

  // Fetch students from server
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.dob) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post(API_URL, formData);

      // Fetch updated list of students
      fetchStudents();

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        course: "Select",
        dob: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  // Handle deleting a student
  const handleDelete = async (index) => {
    try {
      await axios.delete(`${API_URL}/${index}`);

      // Fetch updated students
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="container">
      <h1>Student Management</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Course:
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
          >
            <option value="Select" disabled>Select</option>
            <option value="BTech">BTech</option>
            <option value="BCA">BCA</option>
            <option value="MTech">MTech</option>
            <option value="MCA">MCA</option>
          </select>
        </label>
        <label>
          DOB:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Student</button>
      </form>

      <h2>Students List</h2>
      {students.length === 0 ? (
        <p className="data-msg">No students added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Course</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.course}</td>
                <td>{student.dob}</td>
                <td>
                  {/* <button onClick={() => handleDelete(index)}>delete</button> */}
                  <FontAwesomeIcon 
                    icon={faTrash} 
                    onClick={() => handleDelete(index)}
                    className="trash-icon" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
