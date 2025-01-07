"use server";

import pool from "@/db/connection";

export async function fetchAllSchools() {
  const query = `
    SELECT id, name, address, city, state, contact, email_id, image_path
    FROM school_info
  `;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query);
    connection.release();

    // Return the fetched data
    return { success: true, data: rows };
  } catch (err) {
    console.error("Error fetching schools from the database:", err);
    return { success: false, error: "Failed to fetch schools" };
  }
}
