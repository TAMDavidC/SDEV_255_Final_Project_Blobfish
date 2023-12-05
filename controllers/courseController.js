// MongoDB
const Course = require('../models/course');

const course_index = (req, res) => {
    Course.find().sort({createdAt: -1})
        .then(result =>{
            res.render("courses/index", {title: "Courses", courses:result})
        })
        .catch(err => {
            console.log(err)
        });
}

const course_create_screen = (req, res) => {
    res.render("courses/create", {title: "Create Course"})
}

const update_course_screen = (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            res.render("courses/update", {title: "Update Course", course: result })
        })
        .catch(err => {
            console.log(err);
        })
}

const update_course = (req, res) => {
    const update = {
        title: req.body.title,
        desc: req.body.desc,
        subject: req.body.subject,
        credits: req.body.credits}

    Course.findOneAndUpdate({_id: req.body._id}, update, {new: true})
        .then((result) =>{
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err);
        });
}

const create_course = (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) =>{
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err);
        });
}

const get_course = (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            res.render("courses/course", { title: "Course", course: result })
        })
        .catch(err => {
            console.log(err);
        })
}

const delete_course = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/courses'});
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {course_index, course_create_screen, update_course_screen, 
    update_course, create_course, get_course, delete_course}