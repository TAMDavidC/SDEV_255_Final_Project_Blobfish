// 11/22/2023
const express = require(`express`);

const app = express();

app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

const dummy_courses = [
    {
        title: "Awesome Class",
        desc: "cool course :) you also won't die",
        subject: "Nothing",
        credits: 10
    },
    {
        title: "Funny Class",
        desc: "This class teaches you how to be funny and nothing else. Very important, no doubt.",
        subject: "Communication",
        credits: 1.5
    },
    {
        title: "Theory of Interdimensional Space Travel and Economics",
        desc: "Learn how to use space travel to make a career.",
        subject: "Business",
        credits: 1
    },
    {
        title: "Web Application Development",
        desc: "Students will learn how to use and apply client and server-side scripting and application programming interfaces to build web-based applications which interact with a data source including XML and JSON.  Students will prepare both front and back-end content using techniques including, Hyper Text Markup Language and JavaScript to create dynamic data-driven web interfaces. The course builds on the Web Site Development course, emphasizing full stack implementation.",
        subject: "Software Development",
        credits: 3
    }
]

// links
app.get("/", (req, res) => {
    res.render("index", {title: "Home"})
})

app.get("/courseIndex", (req, res) => {
    res.render("courseIndex", {title: "Courses", courses:dummy_courses})
})

app.get("/login", (req, res) => {
    res.render("login", {title: "Login"})
})

app.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign up"})
})

app.get("/course", (req, res) => {
    res.render("course", {
            title: "Course",
            course: {
                title: "????",
                desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quis ullam praesentium fugiat nulla, animi quasi dignissimos adipisci voluptates veritatis impedit veniam architecto natus maxime sed vel molestias culpa deleniti!",
                subject: "????",
                credits: "#"
            },
        
        })
})

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})