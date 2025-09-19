require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const cors = require("cors")
const port = process.env.PORT || 3000;
const app = express();


app.use(cors())
app.use(express.static("public"));
app.use(express.json());
app.use("/api/auth",require("./routes/auth"))
app.use("/api/calendar",require("./routes/calendar"))

const upServer = async () => {
  try {
    await connectDB();
    const server = app.listen(port, () => {
        const address =server.address()
      console.log(`Escuchando por el puerto ${address.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

upServer();
