// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Remove later
console.log("testing");

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// A sample API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
