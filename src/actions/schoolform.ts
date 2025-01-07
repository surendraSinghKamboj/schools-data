"use server";

import pool from "@/db/connection";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export async function handleSchoolForm(data: FormData) {
  const name = data.get("name") as string;
  const address = data.get("address") as string;
  const city = data.get("city") as string;
  const state = data.get("state") as string;
  const contact = Number(data.get("contact"));
  const email_id = data.get("email_id") as string;
  const image = data.get("image") as File | null;

  if (!name || !address || !city || !state || !email_id) {
    throw new Error("All fields are required");
  }

  let newName;

  if (image) {
    const extension = path.extname(image.name);
    newName = `${uuidv4()}${extension}`;
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const imagePath = path.join(uploadsDir, newName);
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(imagePath, imageBuffer);
  }

  const query = `
    INSERT INTO school_info (name, address, city, state, contact, email_id, image_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const connection = await pool.getConnection();
    await connection.execute(query, [
      name,
      address,
      city,
      state,
      contact,
      email_id,
      `${!name?"":`/uploads/${newName}`}`,
    ]);
    connection.release();
  } catch (err) {
    console.error("Error saving data to the database:", err);
    throw new Error("Failed to save form data");
  }

  redirect(`/?message=${encodeURIComponent("Form submitted successfully!")}`);
}
