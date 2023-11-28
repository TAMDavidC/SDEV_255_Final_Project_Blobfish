// 11/22/2023
const express = require(`express`);
const morgan = require(`morgan`);
const mongoose = require('mongoose');

// MongoDB
const Course = require('./models/course');


const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://user1:test4321@cluster0.rlhew1a.mongodb.net/Final_Project?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// middle ware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// links
app.get("/", (req, res) => {
    res.render("index", {title: "Home"})
})

// courses

app.get("/courses", (req, res) => {
    Course.find().sort({createdAt: -1})
        .then(result =>{
            res.render("courseIndex", {title: "Courses", courses:result})
        })
        .catch(err => {
            console.log(err)
        });
    
})

app.get("/courses/:id", (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            res.render("course", { title: "Course", course: result })
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("/courses/create", (req, res) =>{
    res.render("createCourse", {title: "Create Course"})
})

app.post('/courses', (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) =>{
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err);
        });
})


// other stuff
app.get("/login", (req, res) => {
    res.render("login", {title: "Login"})
})

app.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign up"})
})

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})