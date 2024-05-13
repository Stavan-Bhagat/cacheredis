const express = require("express");
const database = require("./Connection/connection");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes/allRoutes");
const blogRoutes = require("./Routes/allRoutes");
const app = express();
const port = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;

database();

app.use(express.json());
// app.use(cors({ origin: ["blog-psi-five-36.vercel.app
// ", "blog-psi-five-36.vercel.app", "http://localhost:3000", "http://localhost:3000/"] }));
app.use(cors({ origin: ["https://blog-psi-five-36.vercel.app","https://blog-psi-five-36.vercel.app/"] }));
app.use("/submit", userRoutes);
app.use("/blog", blogRoutes);
app.use("/refresh", userRoutes);
app.use("/", (req, res) => {
  res.send("demo api");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
