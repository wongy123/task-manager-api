const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");

const indexRouter = require("./src/routes/index");

const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/task-manager";

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongoDB);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;