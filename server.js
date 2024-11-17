const express = require("express");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
require("dotenv").config();
require("./db/conn");
require("./controllers/socket");

const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5015;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);

// Serve static files from React app (only in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Socket.io setup (if needed)
const io = new Server(server);
