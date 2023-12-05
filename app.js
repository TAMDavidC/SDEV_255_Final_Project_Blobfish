// 11/22/2023
const express = require(`express`);
const morgan = require(`morgan`);
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');

const courseRoutes = require('./routes/courseRoutes')
const authRoutes = require('./routes/authRoutes')


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
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('*', checkUser);
// links
app.get("/", (req, res) => {
    res.render("index", {title: "Home"});
})

// courses
app.use('/courses', courseRoutes);

// auth
app.use(authRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})