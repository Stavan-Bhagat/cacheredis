const express = require("express");
const database = require("./Connection/connection");
const cors = require("cors");
const userRoutes = require('./Routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;

database();

app.use(express.json());
app.use(cors({ origin: corsOrigin }));
app.use("/submit", userRoutes);
// app.use("/refresh", userRoutes);
app.use("/", (req, res) => {
  res.send("demo api")
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//-----------------------------------
// const express = require("express");
// const database = require("./Connection/connection");
// const cors = require("cors");
// const userRoutes = require('./Routes/userRoutes');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT;
// const corsApi = process.env.CORS_ORIGIN;

// const corsOptions = {
//   origin: corsApi, // Set allowed origin(s)
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified methods
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// database();
// app.use(express.json());
// app.use("/", (req, res) => {
//   res.send("demo api");
// });
// app.use(cors(corsOptions)); // Use cors middleware with options
// app.use("/submit", userRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
