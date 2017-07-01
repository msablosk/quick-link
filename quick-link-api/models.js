'use strict';

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let LinkSchema = new Schema({
    link: String,
    createdAt: {type: Date, default: Date.now},
});


let Link = mongoose.model("Link", LinkSchema);

module.exports.Link = Link;