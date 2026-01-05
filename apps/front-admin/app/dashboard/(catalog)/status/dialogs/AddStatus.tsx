"use client";
import { useState } from "react";

import { createStatus } from "@packages/shared-front/modules/status";

import Input from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/CustomButton";
import { Dialog } from "@/components/dialogs/Dialog";

interface AddProductProps {
  onClose: () => void;
  onSave: () => void;
}

export default function AddStatus({ onClose, onSave }: AddProductProps) {

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");

  const cleanupForm = () => {
    setName("");
  };

  const validateForm = () => {
    if (name === "") return false;
    return true;
  };

  const handleCreateStatus = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const statusData = {
        name,
      };

      await createStatus(statusData);
    } catch (error) {
      console.error("Error creating status", error);

    } finally {
      setIsLoading(false);
      onSave();
      cleanupForm();
    }
  };


  return (
    <Dialog onClose={onClose} title="Add new status">
      <div className="flex flex-col">
        {/* Form Fields */}
        <div className="flex space-x-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 grid-rows-1 mb-4">

            <Input
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
        </div>


        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            onClick={onClose}
            disabled={isLoading}
            label="Cancel"
            variant="secondary"
          />
          <Button
            onClick={handleCreateStatus}
            disabled={isLoading}
            label={isLoading ? "Saving..." : "Save"}
            variant="primary-blue"
          />
        </div>

      </div>

    </Dialog >

  );
}
