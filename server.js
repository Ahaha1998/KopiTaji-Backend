const express = require("express");
const cors = require("cors");
const app = express();

// Connect to Database
require("./config/connection");

//Express Middleware
app.use(cors());
app.use(express.json());

//Index Route
app.get("/", (req, res) => {
  res.send("Please use /api/user or /api/alternatif or /api/table");
});

app.use("/api/user", require("./routes/user_route"));
app.use("/api/table", require("./routes/table_route"));
app.use("/api/alternatif", require("./routes/alternatif_route"));
app.use("/api/moora", require("./routes/moora_route"));
app.use("/api/topsis", require("./routes/topsis_route"));

// Start Server
app.listen(1998, () => {
  console.log("http://localhost:1998");
});
