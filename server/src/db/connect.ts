import mongoose from "mongoose";

export const connectDB = (callback: () => void) => {
  return mongoose
    .connect("mongodb://localhost:27017/Graphql")
    .then(() => callback())
    .catch((err) => console.log(err));
};
