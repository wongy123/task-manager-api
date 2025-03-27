const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    description: { type: String, maxLength: 500 },
    dueDate: { type: Date },
    status: { type: String, required: true, maxLength: 100 }
});

TaskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Task", TaskSchema);