const {Router} = require('express');
const courseController = require('../controllers/courseController')
const {requireAuthTeacher} = require('../middleware/authMiddleware');

const router = Router();

router.get("/", courseController.course_index); // all courses
router.get("/create", requireAuthTeacher, courseController.course_create_screen); // create a course screen
router.get("/create/:id", requireAuthTeacher, courseController.update_course_screen); // update a course screen
router.post("/create", requireAuthTeacher, courseController.update_course); // update a course
router.post('/', requireAuthTeacher, courseController.create_course); // add new course
router.get("/:id", courseController.get_course); // get a course
router.delete('/:id', requireAuthTeacher, courseController.delete_course); // delete a course

module.exports = router;