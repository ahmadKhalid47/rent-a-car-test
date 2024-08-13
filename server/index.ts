import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error";
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";
import path from "path";
import connectDB from "./database/db";
import categoryRoutes from "./routes/category.router";
import {v2 as cloudinary} from 'cloudinary'
import bodyParser from "body-parser";
const app = express();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_SECRET_KEY,
// });

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin:"http://localhost:5173", credentials: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(bodyParser.json());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category",categoryRoutes)

app.use(errorMiddleware);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});
const port = process.env.PORT || 5000;
connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is running on PORT: ${port} in ${process.env.NODE_ENV} mode.`);
    });

    process.on("unhandledRejection", (err: any) => {
      console.log(`ERROR: ${err.message}`);
      console.log("Shutting down the server due to Unhandled Promise rejection");
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed >>>>", err);
  });
