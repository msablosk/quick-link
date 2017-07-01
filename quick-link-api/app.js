'use strict';

let express = require('express');
let app = express();
let routes = require("./routes")
let cors = require("cors");
let jsonParser = require("body-parser").json;
let mongoose = require('mongoose');
let morgan = require("morgan");


app.use(morgan('dev'));
app.use(jsonParser());

app.options('*', cors())

mongoose.connect("mongodb://localhost:27017/qa");

let db = mongoose.connection;

db.on("error", (err) => {
    console.error("connnection error: ", err)
});

db.once("open", () => {
    console.log("db connection succeeded");
});


app.use("/api", routes)

// catch 404
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("listening on port 8080");
})