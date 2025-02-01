"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Medication {
  dosage: string;
  frequency: string;
}

interface Medications {
  ibuprofen: Medication;
}

interface FormData {
  DOB: string;
  allergies: string[];
  chronicConditions: string[];
  firstName: string;
  height: string;
  immunizations: string[];
  lastName: string;
  medications: Medications;
  weight: string;
}

export default function UpdateInfoForm() {
  const [formData, setFormData] = useState<FormData>({
    DOB: "2000-01-01",
    allergies: [""],
    chronicConditions: [""],
    firstName: "John",
    height: "",
    immunizations: [""],
    lastName: "Smith",
    medications: {
      ibuprofen: {
        dosage: "200mg",
        frequency: "Twice a day",
      },
    },
    weight: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    arrayName: "allergies" | "chronicConditions" | "immunizations",
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = value;
      return { ...prev, [arrayName]: updatedArray };
    });
  };

  const addArrayItem = (
    arrayName: "allergies" | "chronicConditions" | "immunizations"
  ) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName], ""];
      return { ...prev, [arrayName]: updatedArray };
    });
  };

  const handleMedicationChange = (
    e: ChangeEvent<HTMLInputElement>,
    medicationName: keyof Medications
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      medications: {
        ...prev.medications,
        [medicationName]: {
          ...prev.medications[medicationName],
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Check console for submitted form data");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Patient Information Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="DOB">Date of Birth</Label>
            <Input
              id="DOB"
              name="DOB"
              type="date"
              value={formData.DOB}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Allergies</Label>
            {formData.allergies.map((allergy, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={allergy}
                  onChange={(e) => handleArrayChange(e, "allergies", index)}
                />
                {index === formData.allergies.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => addArrayItem("allergies")}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Chronic Conditions</Label>
            {formData.chronicConditions.map((condition, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={condition}
                  onChange={(e) =>
                    handleArrayChange(e, "chronicConditions", index)
                  }
                />
                {index === formData.chronicConditions.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => addArrayItem("chronicConditions")}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Immunizations</Label>
            {formData.immunizations.map((imm, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={imm}
                  onChange={(e) => handleArrayChange(e, "immunizations", index)}
                />
                {index === formData.immunizations.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => addArrayItem("immunizations")}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Medications</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ibuprofen-dosage">Ibuprofen Dosage</Label>
                <Input
                  id="ibuprofen-dosage"
                  name="dosage"
                  value={formData.medications.ibuprofen.dosage}
                  onChange={(e) => handleMedicationChange(e, "ibuprofen")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ibuprofen-frequency">Ibuprofen Frequency</Label>
                <Input
                  id="ibuprofen-frequency"
                  name="frequency"
                  value={formData.medications.ibuprofen.frequency}
                  onChange={(e) => handleMedicationChange(e, "ibuprofen")}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
