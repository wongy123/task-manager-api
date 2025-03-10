const express = require("express");
const app = express();

const indexRouter = require("./src/routes/index");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;