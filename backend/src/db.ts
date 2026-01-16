import * as mongoose from "mongoose";

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const dbName = process.env.MONGODB_DB_NAME || "shopping-list";

  try {
    await mongoose.connect(`${uri}/${dbName}`);
    console.log("Connected to MongoDB");
    return mongoose;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log("MongoDB connection closed");
}
