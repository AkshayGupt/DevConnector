const express = require('express');
const cors = require('cors');
const connectDB = require("./config.js/db");
const app  = express();



//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended:false }));
app.use(cors());
app.get("/",(req,res) => res.send("Hey Whats up!!"));

//Define Routes
app.use("/api/user",require("./routes/api/user"));
app.use("/api/profile",require("./routes/api/profile"));
app.use("/api/auth",require("./routes/api/auth"));
app.use("/api/posts",require("./routes/api/posts"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started ${PORT}`));