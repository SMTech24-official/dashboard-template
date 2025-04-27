import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import { Clinician, CustomInputEvent } from "../../types/types";

const ExampleForm: React.FC = () => {
  const [clinicianInfo, setClinicianInfo] = useState<Partial<Clinician>>({
    telehealthOnly: false, // Initialize boolean field
  });

  const handleInputChange = (event: CustomInputEvent) => {
    const { name, value, type } = event.target;
    
    // Handle radio/checkbox inputs differently
    const newValue = type === "radio" 
      ? value === "Yes" 
      : value;

    setClinicianInfo(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Group related fields together for better organization
  const personalInfoFields = [
    { name: "name", label: "Name:", type: "text", placeholder: "Enter Name", required: true },
    { name: "practice", label: "Practice:", type: "text", placeholder: "Enter Practice" },
    { name: "portfolioLink", label: "Personal Portfolio Link", type: "text", placeholder: "Enter Portfolio Link" },
  ];

  const professionalInfoFields = [
    { name: "qualifications", label: "Qualifications:", type: "text", placeholder: "Enter Qualifications" },
    { name: "therapeuticMethods", label: "Therapeutic Methods", type: "text", placeholder: "Enter Therapeutic Methods" },
    { name: "specialities", label: "Specialities:", type: "text", placeholder: "Enter Specialities" },
    { name: "serviceTypes", label: "Service Types:", type: "text", placeholder: "Enter Service Types" },
  ];

  const availabilityFields = [
    { name: "availabilityDay", label: "Availability Day", type: "text", placeholder: "Enter Availability Day" },
    { name: "availabilityTime", label: "Availability Time", type: "text", placeholder: "Enter Availability Time" },
  ];

  const locationFields = [
    { name: "location", label: "Location:", type: "text", placeholder: "Enter Location" },
    { 
      name: "telehealthOnly", 
      label: "Telehealth Only", 
      type: "radio", 
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      value: clinicianInfo.telehealthOnly ? "Yes" : "No"
    },
  ];

  const descriptionFields = [
    { name: "descriptions", label: "Descriptions:", type: "textarea", placeholder: "Enter Descriptions", rows: 6 },
    { name: "about", label: "Bio:", type: "textarea", placeholder: "Enter Bio", rows: 6 },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderInputGroup = (fields: any[], cols = 2) => (
    <div className={`w-full md:grid md:grid-cols-${cols} gap-4 mb-4`}>
      {fields.map((field) => (
        <CustomInput
          key={field.name}
          {...field}
          value={clinicianInfo[field.name as keyof Clinician] || ""}
          onChange={handleInputChange}
          className="w-full"
          fullWidth={field.type === "textarea"}
        />
      ))}
    </div>
  );

  return (
    <form className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      {renderInputGroup(personalInfoFields)}

      <h2 className="text-xl font-semibold">Professional Information</h2>
      {renderInputGroup(professionalInfoFields)}
      {renderInputGroup([professionalInfoFields[2], professionalInfoFields[3]])}

      <h2 className="text-xl font-semibold">Location Information</h2>
      {renderInputGroup(locationFields)}

      <h2 className="text-xl font-semibold">Availability</h2>
      {renderInputGroup(availabilityFields)}

      <h2 className="text-xl font-semibold">Descriptions</h2>
      {renderInputGroup(descriptionFields, 1)}

      <div className="mb-4">
        <CustomInput
          label="Image"
          type="image"
          name="image"
          value={clinicianInfo.image}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
    </form>
  );
};

export default ExampleForm;