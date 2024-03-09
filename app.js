const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const collection = require("./model/config");

const indexRoute = require("./routes/index");
const dashboardRoute = require("./routes/dashboard");

app.use(express.json());
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRoute);
app.use("/dashboard", dashboardRoute);

app.listen(4000, () => {
    console.log("Server connected to the port");
});
