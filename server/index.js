const mongoose = require("mongoose");
const countryRoutes = require("./routers/country.js");
const postRoutes = require("./routers/post.js");

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Start our app!
const app = require("./app");
app.set("port", process.env.PORT || 8888);

app.use("/api/countries", countryRoutes);
app.use("/api/posts", postRoutes);

const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
