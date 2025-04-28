/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import CustomInput from "../ui/CustomInput";
import { Clinician, CustomInputEvent } from "../../types/types";
import LocationSearch from "../map/MapSearchInbox";
import { useCreateClinicianMutation } from "../../Redux/apis/clinician/cliniciansApi";
import { toast } from "sonner";
import CustomButton from "../ui/CustomButton";

const ExampleForm: React.FC = () => {
  const [createClinician, { isLoading: createClinicianLoading }] =
    useCreateClinicianMutation();
  const [clinicianInfo, setClinicianInfo] = useState<Partial<Clinician> | null>(
    {}
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleClinicianInfoChange = (event: CustomInputEvent) => {
    const { name, value } = event.target;
    setClinicianInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create FormData for the image
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
    // 3. Use it in your form submission
    const jsonData = {
      ...clinicianInfo,
      telehealthOnly: convertTelehealth(clinicianInfo?.telehealthOnly),
    };
    formData.append("bodyData", JSON.stringify(jsonData));
    // Now call your API mutation function with both formData and bodyData
    try {
      // Assuming you have a mutation function that accepts both
      const result = await createClinician(formData);
      console.log(result);
      if (result?.data) {
        toast.success("Clinician created successfully");
        setClinicianInfo(null);
        return;
      } else if (result?.error) {
        const errorMessage = (
          result as { error: { data: { message: string } } }
        ).error.data.message;
        toast.error(errorMessage);
        return;
      }
      // Handle success
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
          placeholder="Enter Therapeutic Methods"
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
        placeholder="Enter Specialities"
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />

      <CustomInput
        label="Service Types:"
        type="text"
        placeholder="Enter Service Types"
        name="serviceTypes"
        value={clinicianInfo?.serviceTypes}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />

      <CustomInput
        label="Ages Served:"
        type="text"
        name="agesServed"
        placeholder="Enter Ages Served"
        value={clinicianInfo?.agesServed}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />
      <LocationSearch
        setClinicianInfo={setClinicianInfo}
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

      <CustomInput
        label="Availability Day"
        type="text"
        name="availabilityDay"
        placeholder="Enter Availability Day"
        value={clinicianInfo?.availabilityDay}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />
      <CustomInput
        label="Availability Time"
        type="text"
        name="availabilityTime"
        placeholder="Enter Availability Time"
        value={clinicianInfo?.availabilityTime}
        onChange={(e) => handleClinicianInfoChange(e)}
        fullWidth
      />
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

      <div className=" flex justify-center items-center">

        <CustomButton isLoading={createClinicianLoading} type="submit">Create Clinician</CustomButton>
      </div>
    </form>
  );
};

export default ExampleForm;
