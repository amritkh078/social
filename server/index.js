import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// middleware
const __filename = fileURLToPath(import.meta.url); // file path 
const __dirname = path.dirname(__filename); // directory path
dotenv.config(); // load .env file
const app = express(); // initialize express
app.use(express.json()); // parse json
app.use(helmet()); // secure http headers
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); 
app.use(morgan("common")); // log http requests
app.use(bodyParser.json({ limit: "30mb", extended: true })); // parse json
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // parse url encoded
app.use(cors()); // invoke cors
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); 