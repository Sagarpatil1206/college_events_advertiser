import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from 'dotenv'
import path from 'path'

import router from "./routes/postRoutes.js";

const app = express();
const __dirname = path.resolve();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('', router);

app.use(express.static(path.join(__dirname,"./college_events/build")));
app.get("*",function(req,res){
  res.sendFile(
    path.join(__dirname,"./college_events/build/index.html"),
    // function(err){
    //   res.status(500).send(err);
    // }
  );
});

// const CONNECTION_URL = 'mongodb+srv://sagarpatil1206:Sagar@1206@cluster0.n0l2nh1.mongodb.net/?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running successfully on Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

