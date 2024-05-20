// const express = require('express');
// const database = require('./Connection/connection');
// const cors = require('cors');
// require('dotenv').config();
// const userRoutes = require('./Routes/allRoutes');
// const blogRoutes = require('./Routes/allRoutes');
// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// const redisClient = require('./redisClient'); // Import Redis client

// const app = express();
// const port = process.env.PORT || 8080;

// database();

// app.use(express.json());
// app.use(cors({
//   origin: [
//     "https://cloudinaryblog.vercel.app/",
//     "https://cloudinaryblog.vercel.app",
//     "http://localhost:3000/",
//     "http://localhost:3000"
//   ]
// }));

// // Setup session management
// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false, maxAge: 3600000 }, // 1 hour
// }));

// app.use('/submit', userRoutes);
// app.use('/blog', blogRoutes);
// app.use('/refresh', userRoutes);
// app.use('/', (req, res) => {
//   res.send('demo api');
// });

// app.listen(port, () => {
//   console.log(`Server is running on ${port}`);
// });
// devdependecy
 // "@eslint/eslintrc": "^3.0.2",
    // "@eslint/js": "^9.2.0",
    // "eslint": "^9.2.0",
    // "eslint-define-config": "^2.1.0",
    // "eslint-plugin-import": "^2.29.1",
    // "eslint-plugin-node": "^11.1.0",
    // "eslint-plugin-react": "^7.34.1",
    // "eslint-plugin-security": "^3.0.0",
    // "globals": "^15.2.0"

const express = require("express");
const database = require("./Connection/connection");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes/allRoutes");
const blogRoutes = require("./Routes/allRoutes");
const app = express();
const port = process.env.PORT || 8080;

database();

app.use(express.json());
app.use(cors({
  origin: [
   "https://cloudinaryblog.vercel.app/",
   "https://cloudinaryblog.vercel.app",
    "http://localhost:3000/",
    "http://localhost:3000"
  ]
}));
app.use("/submit", userRoutes);
app.use("/blog", blogRoutes);
app.use("/refresh", userRoutes);
app.use("/", (req, res) => {
  res.send("demo api");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
