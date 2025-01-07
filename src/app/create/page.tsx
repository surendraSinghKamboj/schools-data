"use client";

import React, { useState } from "react";
import Input from "../components/Input";
import Image from "next/image";
import { handleSchoolForm } from "@/actions/schoolform";

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: 0,
    image: null as File | null,
    email_id: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "contact" ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("contact", formData.contact.toString());
    formDataToSend.append("email_id", formData.email_id);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    await handleSchoolForm(formDataToSend);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">School Information Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={formData.name}
            handleChange={handleChange}
            name="name"
            label="Name"
          />

          <Input
            type="text"
            value={formData.address}
            handleChange={handleChange}
            name="address"
            label="Address"
          />

          <Input
            type="text"
            value={formData.city}
            handleChange={handleChange}
            name="city"
            label="City"
          />

          <Input
            type="text"
            value={formData.state}
            handleChange={handleChange}
            name="state"
            label="State"
          />

          <Input
            type="number"
            value={formData.contact}
            handleChange={handleChange}
            name="contact"
            label="Contact"
          />

          <Input
            type="email"
            value={formData.email_id}
            handleChange={handleChange}
            name="email_id"
            label="E-mail"
          />

          <div>
            <label
              htmlFor="file"
              className="block cursor-pointer text-center text-sm font-medium"
            >
              {imagePreview ? (
                <Image
                  className="mx-auto"
                  src={imagePreview}
                  alt="Selected File"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  className="mx-auto"
                  src="https://img.icons8.com/pulsar-gradient/100/image-file-add.png"
                  alt="file"
                  width={100}
                  height={100}
                />
              )}
            </label>
            <input
              id="file"
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full hidden p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
