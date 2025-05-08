/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import { AvailabilityDay, AvailabilityTime, Clinician, CustomInputEvent } from "../../types/types";
import LocationSearch from "../map/MapSearchInbox";
import { useCreateClinicianMutation } from "../../Redux/apis/clinician/cliniciansApi";
import { toast } from "sonner";
import CustomButton from "../ui/CustomButton";

const DAY_OPTIONS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "AnyDay",
];

const TIME_OPTIONS = [
  "Morning",
  "Noon",
  "Afternoon",
  "Evening",
  "Night",
  "AnyTime",
];

const ExampleForm: React.FC = () => {
  const [createClinician, { isLoading: createClinicianLoading }] =
    useCreateClinicianMutation();
  const [clinicianInfo, setClinicianInfo] = useState<Partial<Clinician>>({
    name: "",
    email: "",
    password: "",
    practice: "",
    portfolioLink: "",
    qualifications: "",
    therapeuticMethods: "",
    specialities: "",
    serviceTypes: "",
    agesServed: "",
    telehealthOnly: false,
    availabilityDay: [],
    availabilityTime: [],
    descriptions: "",
    about: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const resetForm = () => {
    setClinicianInfo({
      name: "",
      email: "",
      password: "",
      practice: "",
      portfolioLink: "",
      qualifications: "",
      therapeuticMethods: "",
      specialities: "",
      serviceTypes: "",
      agesServed: "",
      telehealthOnly: false,
      availabilityDay: [],
      availabilityTime: [],
      descriptions: "",
      about: "",
    });
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const handleClinicianInfoChange = (event: CustomInputEvent) => {
    const { name, value } = event.target;
    setClinicianInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDayToggle = (day: string) => {
    setClinicianInfo((prev:any) => {
      const currentDays = prev.availabilityDay || [];
      const newDays = currentDays.includes(day)
        ? currentDays.filter((d:any) => d !== day)
        : [...currentDays, day];
      
      // If "AnyDay" is selected, clear other days
      if (day === "AnyDay" && !currentDays.includes("AnyDay")) {
        return { ...prev, availabilityDay: ["AnyDay"] };
      }
      // If another day is selected when "AnyDay" was already selected, remove "AnyDay"
      if (day !== "AnyDay" && currentDays.includes("AnyDay")) {
        return { ...prev, availabilityDay: [day] };
      }
      return { ...prev, availabilityDay: newDays };
    });
  };

  const handleTimeToggle = (time: string) => {
    setClinicianInfo((prev:any) => {
      const currentTimes = prev.availabilityTime || [];
      const newTimes = currentTimes.includes(time)
        ? currentTimes.filter((t:any) => t !== time)
        : [...currentTimes, time];
      
      // If "AnyTime" is selected, clear other times
      if (time === "AnyTime" && !currentTimes.includes("AnyTime")) {
        return { ...prev, availabilityTime: ["AnyTime"] };
      }
      // If another time is selected when "AnyTime" was already selected, remove "AnyTime"
      if (time !== "AnyTime" && currentTimes.includes("AnyTime")) {
        return { ...prev, availabilityTime: [time] };
      }
      return { ...prev, availabilityTime: newTimes };
    });
  };

  const removeDay = (day: string) => {
    setClinicianInfo((prev) => ({
      ...prev,
      availabilityDay: (prev.availabilityDay || []).filter((d) => d !== day),
    }));
  };

  const removeTime = (time: string) => {
    setClinicianInfo((prev) => ({
      ...prev,
      availabilityTime: (prev.availabilityTime || []).filter((t) => t !== time),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

            type TelehealthOption = boolean | "Yes" | "No";
    // 2. Create a type-safe converter function
    function convertTelehealth(value: TelehealthOption | undefined): boolean {
      if (value === undefined) return false; // default value
      if (typeof value === "boolean") return value;
      return value === "Yes";
    }

    // Convert array fields from strings to arrays if they're strings
    const processedInfo = {
      ...clinicianInfo,
      telehealthOnly: convertTelehealth(clinicianInfo?.telehealthOnly),
    };


    formData.append("bodyData", JSON.stringify(processedInfo));

    try {
      const result = await createClinician(formData);
      if (result?.data) {
        toast.success("Clinician created successfully");
        resetForm();
        return;
      } else if (result?.error) {
        const errorMessage = (
          result as { error: { data: { message: string } } }
        ).error.data.message;
        toast.error(errorMessage);
        return;
      }
    } catch (error) {
      const errorMessage =
        (error as { data: { message: string } }).data?.message ||
        "Failed to create clinician";
      toast.error(errorMessage);
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <CustomInput
        label="Name:"
        type="text"
        name="name"
        value={clinicianInfo?.name}
        onChange={(e) => handleClinicianInfoChange(e)}
        placeholder="Enter Name"
        fullWidth
        required
      />

      <div className="w-full md:grid md:grid-cols-2 gap-4">
        <CustomInput
          name="email"
          className="w-full"
          onChange={(e) => handleClinicianInfoChange(e)}
          placeholder="Enter Email"
          value={clinicianInfo?.email}
          label="Email:"
          required
          type="email"
        />
        <CustomInput
          name="password"
          className="w-full"
          onChange={(e) => handleClinicianInfoChange(e)}
          value={clinicianInfo?.password}
          placeholder="Enter Password"
          label="Password"
          type="password"
        />
      </div>
      <div className="w-full md:grid md:grid-cols-2 gap-4">
        <CustomInput
          name="practice"
          className="w-full"
          onChange={(e) => handleClinicianInfoChange(e)}
          placeholder="Enter Practices"
          value={clinicianInfo?.practice}
          label="Practice:"
          type="text"
        />
        <CustomInput
          name="portfolioLink"
          className="w-full"
          onChange={(e) => handleClinicianInfoChange(e)}
          value={clinicianInfo?.portfolioLink}
          placeholder="Enter Portfolio Link"
          label="Personal Portfolio Link"
          type="text"
        />
      </div>
      <div className="w-full md:grid md:grid-cols-2 gap-4">
        <CustomInput
          name="qualifications"
          className="w-full"
          onChange={(e) => handleClinicianInfoChange(e)}
          value={clinicianInfo?.qualifications}
          placeholder="Enter Qualifications"
          label="Qualifications:"
          type="text"
        />
        <CustomInput
          name="therapeuticMethods"
          className="w-full"
          onChange={(e) => handleClinicianInfoChange(e)}
          placeholder="Enter Therapeutic Methods (comma separated)"
          value={clinicianInfo?.therapeuticMethods}
          label="Therapeutic Methods"
          type="text"
        />
      </div>
      <CustomInput
        label="Specialities:"
        type="text"
        name="specialities"
        value={clinicianInfo?.specialities}
        placeholder="Enter Specialities (comma separated)"
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />

      <CustomInput
        label="Service Types:"
        type="text"
        placeholder="Enter Service Types (comma separated)"
        name="serviceTypes"
        value={clinicianInfo?.serviceTypes}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />

      <CustomInput
        label="Ages Served:"
        type="text"
        name="agesServed"
        placeholder="Enter Ages Served (comma separated)"
        value={clinicianInfo?.agesServed}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />
      
      <LocationSearch
        setClinicianInfo={setClinicianInfo as any}
        clinicianInfo={clinicianInfo}
      />
      
      <CustomInput
        type="radio"
        name="telehealthOnly"
        label="Telehealth Only"
        value={clinicianInfo?.telehealthOnly ? "Yes" : "No"}
        onChange={(e) => handleClinicianInfoChange(e)}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
      />

      {/* Availability Days Section */}
      <div className="mb-6">
        <label className="block text-gray-700 text-md font-medium mb-2 ml-1">
          Availability Days
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {clinicianInfo.availabilityDay?.map((day) => (
            <div
              key={day}
              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {day}
              <button
                type="button"
                onClick={() => removeDay(day)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {DAY_OPTIONS.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => handleDayToggle(day)}
              className={`px-4 py-2 rounded-md text-sm ${
                clinicianInfo.availabilityDay?.includes(day as AvailabilityDay)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Times Section */}
      <div className="mb-6">
        <label className="block text-gray-700 text-md font-medium mb-2 ml-1">
          Availability Times
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {clinicianInfo.availabilityTime?.map((time) => (
            <div
              key={time}
              className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
            >
              {time}
              <button
                type="button"
                onClick={() => removeTime(time)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((time) => (
            <button
              type="button"
              key={time}
              onClick={() => handleTimeToggle(time)}
              className={`px-4 py-2 rounded-md text-sm ${
                clinicianInfo.availabilityTime?.includes(time as AvailabilityTime)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <CustomInput
        label="Image"
        type="image"
        name="image"
        onImageChange={handleImageChange}
        imagePreviewUrl={imagePreviewUrl || undefined}
        fullWidth
      />

      <CustomInput
        label="Descriptions:"
        type="textarea"
        name="descriptions"
        placeholder="Enter Descriptions"
        value={clinicianInfo?.descriptions}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
        rows={12}
      />

      <CustomInput
        label="Bio:"
        type="textarea"
        name="about"
        placeholder="Enter Bio"
        value={clinicianInfo?.about}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
        rows={12}
      />

      <div className="flex justify-center items-center">
        <CustomButton isLoading={createClinicianLoading} type="submit">
          Create Clinician
        </CustomButton>
      </div>
    </form>
  );
};

export default ExampleForm;