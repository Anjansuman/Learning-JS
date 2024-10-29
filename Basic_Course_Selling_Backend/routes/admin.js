const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    const exists = await Admin.findOne({
        username: username,
        password: password
    })
    if(exists) {
        return res.status(409).json({
            msg: "User already exists!"
        })
    }

    // if creation of user fails then it will stop here and will not move to next part
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        msg: "Admin created successfully"
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const exists = await Course.findOne({
        title: title,
        description: description
    })
    if(exists) {
        return res.status(409).json({
            msg: "Course already exists"
        })
    }

    const course = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    }).catch(() => {
        return console.log("Something went wrong!")
    })

    res.json({
        msg: 'Course created successfully', courseId: course._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        Course: response
    })
});

module.exports = router;