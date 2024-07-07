const express = require("express");
const app = express();
const db = require("./config/database");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");
const rateLimiterUsingThirdParty = require("./middleware/ratelimiter");
const cors = require("cors");
const { isAdmin, isUser, isUserOrAdmin } = require("./middleware/authorization");

const PORT = process.env.PORT || 5002;
// Middleware to parse JSON requests
app.use(express.json());
app.use(rateLimiterUsingThirdParty);
app.use(cors());

// Routes
app.use("/todos", isUser, todoRoutes);
app.use("/auth", authRoutes);
app.use("/users", isUserOrAdmin, userRoutes);
app.use("/admin", isAdmin, adminRoutes);
app.use("/public", publicRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Share Pro API");
});

// Connect to the database
db.authenticate()
.then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to database:", err.message));
