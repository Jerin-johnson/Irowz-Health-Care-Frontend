import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

import Button from "../common/Button";
import Card from "../common/Card";
import InputField from "../../../common/InputField";
import SelectField from "../../../common/SelectField";

import type { PrescriptionFormValues } from "../../../../validators/doctor/consultation/Percription";

interface Props {
  form: UseFormReturn<PrescriptionFormValues>;
  onSave: (data: PrescriptionFormValues) => void;
}

const PrescriptionTab = ({ onSave, form }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications",
  });

  return (
    <form
      onSubmit={handleSubmit(onSave, (errors) => {
        console.log("FORM ERRORS", errors);
      })}
      className="space-y-6"
    >
      {/* Primary Diagnosis */}
      <Card className="p-6">
        <InputField
          label="Primary Diagnosis *"
          placeholder="Enter primary diagnosis"
          register={register("primaryDiagnosis")}
          error={errors.primaryDiagnosis?.message}
        />
        <p className="text-xs text-gray-500 mt-1">Min 200 characters</p>
      </Card>

      {/* Clinical Observations */}
      <Card className="p-6">
        <label className="block text-sm font-medium mb-2">
          Clinical Observations
        </label>
        <textarea
          {...register("clinicalObservations")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      </Card>

      {/* Medicine Prescription */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">
            Medicine Prescription
          </h3>

          <Button
            type="button"
            icon={<Plus className="w-4 h-4" />}
            onClick={() =>
              append({
                id: Date.now().toString(),
                name: "",
                dosage: "",
                dosageUnit: "M",

                duration: 7,
                durationUnit: "Days",
                instructions: "After food",
              })
            }
          >
            Add Medicine
          </Button>
        </div>

        {/* HEADER */}
        {fields.length > 0 && (
          <div className="grid grid-cols-12 gap-3 text-xs font-medium text-gray-700 pb-2 border-b mb-4">
            <div className="col-span-3">Medicine Name</div>
            <div className="col-span-3">Dosage</div>
            <div className="col-span-3">Duration</div>
            <div className="col-span-2">Instructions</div>
            <div className="col-span-1 text-center">Remove</div>
          </div>
        )}

        {/* ROWS */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-12 gap-3 items-center mb-4"
          >
            {/* Medicine name */}
            <div className="col-span-3">
              <SelectField
                register={register(`medications.${index}.name`)}
                options={[
                  { value: "Metformin", label: "Metformin" },
                  { value: "Lisinopril", label: "Lisinopril" },
                ]}
              />
            </div>

            {/* Dosage */}
            <div className="col-span-3 flex items-center gap-2">
              <div className="flex-1">
                <InputField
                  type="number"
                  register={register(`medications.${index}.dosage`)}
                />
              </div>

              <div className="w-20">
                <SelectField
                  register={register(`medications.${index}.dosageUnit`)}
                  options={[
                    { value: "M", label: "M" },
                    { value: "A", label: "A" },
                    { value: "N", label: "N" },
                    { value: "M & A", label: "MA" },
                    { value: "M & A & N", label: "MAN" },
                    { value: "M & N", label: "MN" },
                  ]}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="col-span-3 flex items-center gap-2">
              <div className="flex-1">
                <InputField
                  type="number"
                  register={register(`medications.${index}.duration`, {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="w-24">
                <SelectField
                  register={register(`medications.${index}.durationUnit`)}
                  options={[
                    { value: "Days", label: "Days" },
                    { value: "Weeks", label: "Weeks" },
                  ]}
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="col-span-2">
              <SelectField
                register={register(`medications.${index}.instructions`)}
                options={[
                  { value: "After food", label: "After food" },
                  { value: "Before food", label: "Before food" },
                ]}
              />
            </div>

            {/* Remove */}
            <div className="col-span-1 flex justify-center">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-6">
            No medications added yet
          </p>
        )}
      </Card>

      {/* General Advice */}
      <Card className="p-6">
        <label className="block text-sm font-medium mb-2">General Advice</label>
        <textarea
          {...register("generalAdvice")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      </Card>

      {/* Follow-up Date */}
      <Card className="p-6">
        <InputField
          label="Follow-up Date"
          type="date"
          register={register("followUpDate")}
        />
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button type="submit" variant="secondary">
          Save Prescription
        </Button>
      </div>
    </form>
  );
};

export default PrescriptionTab;
