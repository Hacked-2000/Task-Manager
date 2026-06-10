import dotenv from "dotenv";
import path from "path";
import { connectDB } from "../config/db";
import { Task } from "../models/Task";
import { User } from "../models/User";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const SEED_USER = {
  name: "Demo User",
  email: "demo@taskmanager.com",
  password: "demo123",
};

const SAMPLE_TASKS = [
  {
    title: "Set up project repo",
    description: "Initialize git, add README, and push to GitHub.",
    status: "todo" as const,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Build REST API",
    description: "Implement auth and task endpoints with validation.",
    status: "in-progress" as const,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Write README",
    description: "Document setup steps and API endpoints.",
    status: "done" as const,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
];

const seed = async () => {
  await connectDB();

  let user = await User.findByEmail(SEED_USER.email);

  if (!user) {
    user = await User.register(
      SEED_USER.name,
      SEED_USER.email,
      SEED_USER.password
    );
    console.log("Created demo user:", SEED_USER.email);
  } else {
    console.log("Demo user already exists:", SEED_USER.email);
  }

  const existingTasks = await Task.findByUser(user._id.toString());

  if (existingTasks.length > 0) {
    console.log(`Skipping tasks — ${existingTasks.length} already exist for demo user.`);
    process.exit(0);
  }

  for (const task of SAMPLE_TASKS) {
    await Task.createTask(user._id.toString(), task);
  }

  console.log(`Seeded ${SAMPLE_TASKS.length} sample tasks.`);
  console.log(`Login with: ${SEED_USER.email} / ${SEED_USER.password}`);
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
