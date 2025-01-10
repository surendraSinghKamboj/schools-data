import { fetchAllSchools } from "@/actions/fetchSchools";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define a type for the school data
interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number;
  email_id: string;
  image_path: string;
}

const Page: React.FC = async () => {
  try {
    const result = await fetchAllSchools();

    if (!result || !result.success || !result.data) {
      throw new Error(result?.error || "Failed to fetch schools");
    }

    const schools: School[] = result.data as School[];

    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <Link href={"/create"}>
          <button className="bg-green-700 absolute top-20 left-16 text-white hover:bg-white hover:text-green-800 transition-all duration-1000 border-2 py-2 px-4 border-white hover:border-green-700 rounded-xl shadow-xl hover:shadow-green-500 shadow-gray-100">
            Add School
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Schools List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white cursor-pointer p-4 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={
                  school.image_path === "/uploads/undefined"
                    ? "/8074788.png"
                    : school.image_path
                }
                alt={school.name}
                className="w-full object-cover"
                width={400}
                height={250}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {school.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {school.address}, {school.city}, {school.state}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Contact:</strong> {school.contact}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Email:</strong> {school.email_id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error:any) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">
          Error: An Internal Error Occurred.
        </p>
      </div>
    );
  }
};

export default Page;
