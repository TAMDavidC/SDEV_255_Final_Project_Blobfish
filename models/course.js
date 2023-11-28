const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;