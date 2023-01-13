const express = require('express')
const cors=require('cors')
const app = express()
app.use(cors())

const port=process.env.port || 3000
const userRouter = require("./Routes/userRoutes");
const visitor = require("./Routes/visitor")
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

app.use(express.json());
app.use("/users", userRouter);
app.use("/visitorcount", visitor);

app.get('/', (req, res) => res.send('Hello World!'))

mongoose.connect(
    "mongodb+srv://suraj_08:suraj123@cluster0.ganrtfp.mongodb.net/microtask2?retryWrites=true&w=majority",
    () => {
      console.log("Connected to MongoDB");
    }
  );

app.listen(3000, () => {
    console.log("App started");
  });  


module.exports = app