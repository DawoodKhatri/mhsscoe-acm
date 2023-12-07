import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME ?? "Production",
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
