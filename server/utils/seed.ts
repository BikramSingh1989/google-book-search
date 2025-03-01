import db from "../config/connection";
import User from "../models/User";

const seedUsers = async () => {
  await db.once("open", async () => {
    console.log("✅ Connected to database, seeding users...");

    // Clear existing users
    await User.deleteMany();

    // Insert test users
    await User.create([
      {
        username: "testuser1",
        email: "test1@example.com",
        password: "password123"
      },
      {
        username: "testuser2",
        email: "test2@example.com",
        password: "password456"
      }
    ]);

    console.log("✅ Users seeded successfully!");
    process.exit(0);
  });
};

seedUsers();
