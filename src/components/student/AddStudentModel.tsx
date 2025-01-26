import React, { useState, useEffect, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "src/firebase";

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: StudentFormData | null;  
  onSave?: (updatedStudent: StudentFormData) => void;  
  isReadOnly?: boolean; 
}

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

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  open,
  onClose,
  initialData = null,
  onSave,
  isReadOnly = false,
}) => {
  const [formData, setFormData] = useState<StudentFormData>(
    initialData || {
      id: undefined,
      name: "",
      class: "",
      section: "",
      rollNumber: "",
      age: "",
      gender: "",
      address: "",
      phoneNumber: "",
      email: "",
      motherName: "",
      fatherName: "",
      emergencyContact: "",
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: "",
          class: "",
          section: "",
          rollNumber: "",
          age: "",
          gender: "",
          address: "",
          phoneNumber: "",
          email: "",
          motherName: "",
          fatherName: "",
          emergencyContact: "",
        });
      }
    }
  }, [open, initialData]);

  if (!open) return null;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.class.trim()) newErrors.class = "Class is required.";
    if (!formData.section.trim()) newErrors.section = "Section is required.";
    if (!formData.rollNumber.trim() || Number.isNaN(Number(formData.rollNumber)))
      newErrors.rollNumber = "Roll number must be a valid number.";
    if (!formData.age.trim() || Number.isNaN(Number(formData.age)) || Number(formData.age) <= 0)
      newErrors.age = "Age must be a positive number.";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be a valid 10-digit number.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email must be valid.";
    if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required.";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required.";
    if (!formData.emergencyContact.trim() || !/^\d{10}$/.test(formData.emergencyContact))
      newErrors.emergencyContact = "Emergency contact must be a valid 10-digit number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isReadOnly) {
      onClose();
      return;
    }

    if (!validateForm()) return;

    if (onSave) {
      onSave(formData as StudentFormData); 
    } else {
      try {
        await addDoc(collection(db, "students"), formData);  
      } catch (error) {
        console.error("Error adding student: ", error);
      }
    }
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ color: "#333", fontSize: "24px", fontWeight: "600" }}>
            {isReadOnly ? "View Student" : initialData ? "Edit Student" : "Add Student"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#007bff",
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Object.entries(formData).map(([key, value]) =>
            key === "id" ? null : (  
              <div key={key}>
                <input
                  type={key === "email" ? "email" : key === "age" || key === "rollNumber" ? "number" : "text"}
                  placeholder={key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
                  value={value}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  readOnly={isReadOnly}
                  onWheel={(e) => e.currentTarget.blur()} 
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    backgroundColor: isReadOnly ? "#f5f5f5" : "#fff",
                  }}
                />
                {errors[key] && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors[key]}</p>
                )}
              </div>
            )
          )}
          {!isReadOnly && (
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2575fc",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {initialData ? "Save" : "Submit"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
