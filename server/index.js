import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "node:url";
import { register } from "./controllers/auth.js";

// middleware
const filename = fileURLToPath(import.meta.url); // file path
const dirname = path.dirname(filename); // directory path
dotenv.config(); // load .env file
const app = express(); // initialize express
app.use(express.json()); // parse json
app.use(helmet()); // secure http headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); // log http requests
app.use(bodyParser.json({ limit: "30mb", extended: true })); // parse json
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // parse url encoded
app.use(cors()); // invoke cors
app.use("/assets", express.static(path.join(dirname, "public/assets")));

// file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // destination folder for files
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }); // multer instance used to upload files

// routes
app.post('/auth/register', upload.single('picture'), register); // register user


// database connection
const PORT = process.env.PORT || 6000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
