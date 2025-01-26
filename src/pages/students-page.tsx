import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";  
import { Eye, Edit, Trash } from "lucide-react";
import Sidebar from "src/components/student/Sidebar";
import AddStudentModal from "src/components/student/AddStudentModel";
import { db } from "../firebase";

interface StudentFormData {
  id?: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  age: string;
  gender: string;
  address: string;
  phoneNumber: string;
  email: string;
  motherName: string;
  fatherName: string;
  emergencyContact: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<StudentFormData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentFormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(
        querySnapshot.docs.map((studentDoc) => ({
          ...studentDoc.data(),
          id: studentDoc.id,
        }) as StudentFormData)
      );
    };
    fetchStudents();
  }, []);

  const handleView = (student: StudentFormData) => {
    setSelectedStudent(student);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEdit = (student: StudentFormData) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const studentDoc = doc(db, "students", id);
      await deleteDoc(studentDoc);
      setMessage("Student deleted successfully.");
      setStudents((prev) => prev.filter((student) => student.id !== id));
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage("Error deleting student.");
      setTimeout(() => setMessage(null), 3000);
    }
  };
  const handleSave = async (updatedStudent: StudentFormData) => {
    const { id, ...studentData } = updatedStudent;

    if (id) {
      const studentDoc = doc(db, "students", id);
      await updateDoc(studentDoc, studentData);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { id, ...studentData } : student
        )
      );
    } else {
      const docRef = await addDoc(collection(db, "students"), studentData);
      setStudents((prev) => [...prev, { id: docRef.id, ...studentData }]);
    }

    setModalOpen(false);
  };


  return (
    <div
      style={{
        display: "flex",
        minHeight: "100%",
        backgroundColor: "#fff", 
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "250px", 
          padding: "16px",
          flex: 1,
          backgroundColor: "#fff",  
          overflowY: "auto", 
          height: "100%", 
        }}
      >
        <div
          style={{
            backgroundColor: "#F5DEB3",  
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            minHeight: "calc(100vh - 80px)",  
            overflowY: "auto",  
          }}
        >
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
            <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>Students List</h1>
            <button
              type="button"
              onClick={() => {
                setSelectedStudent(null);
                setIsEditing(false);
                setModalOpen(true);
              }}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease",
              }}
            >
              Add Student
            </button>
          </div>

          {message && (
            <div
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
          )}

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#ff7e5f", color: "#fff", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px" }}>ID</th>
                  <th style={{ padding: "12px 16px" }}>Name</th>
                  <th style={{ padding: "12px 16px" }}>Class</th>
                  <th style={{ padding: "12px 16px" }}>Section</th>
                  <th style={{ padding: "12px 16px" }}>Roll Number</th>
                  <th style={{ padding: "12px 16px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    style={{
                      backgroundColor: "#fff",
                      borderBottom: "1px solid #ddd",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <td style={{ padding: "12px 16px" }}>{student.id}</td>
                    <td style={{ padding: "12px 16px" }}>{student.name}</td>
                    <td style={{ padding: "12px 16px" }}>{student.class}</td>
                    <td style={{ padding: "12px 16px" }}>{student.section}</td>
                    <td style={{ padding: "12px 16px" }}>{student.rollNumber}</td>
                    <td style={{ padding: "12px 16px", display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => handleView(student)}
                        style={iconButtonStyle}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(student)}
                        style={iconButtonStyle}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => student.id && handleDelete(student.id)}
                        style={iconButtonStyle}
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AddStudentModal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            initialData={isEditing || selectedStudent ? selectedStudent : null}  
            onSave={handleSave}
            isReadOnly={!isEditing && !!selectedStudent} 
          />
        </div>
      </div>
    </div>
  );
};

const iconButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px",
  color: "#ff7e5f",
  transition: "color 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default StudentsPage;
