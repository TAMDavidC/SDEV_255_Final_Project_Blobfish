// 11/22/2023
const express = require(`express`);

const app = express();

app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);


// links
app.get("/", (req, res) => {
    res.render("index", {title: "Home"})
})

app.get("/login", (req, res) => {
    res.render("login", {title: "Login"})
})

app.get("/Signup", (req, res) => {
    res.render("signup", {title: "Sign up"})
})

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})