import express from "express";
const app = express();
import "./config/db";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

import studentRouter from "./routes/studentRoute";
import teacherRouter from "./routes/teacherRoute";
import syllabusRoute from './routes/syllabusRoute';


// ALL THE MIDDLEWARES GO HERE
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// ALL THE ROUTES HERE
app.use("/v1", studentRouter);
app.use("/v2", teacherRouter);
app.use("/v3",syllabusRoute);



app.get("/", (req, res) => {
  return res.send("welcome to the docker");
});

const port = 5003;

app.listen(port, () => {
  console.log(`Server is running on port ${port} 👍️`);
});
