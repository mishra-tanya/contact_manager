
const express = require("express");
const router = express.Router();
const collection = require("../model/config");

router.get("/", (_, resp) => {
    resp.render('index'); 
});

router.post("/", async (req, resp) => {
    try {
        const checkEmail = await collection.findOne({ email: req.body.email });
        if (checkEmail) {
            resp.render('index', { message: "Email already exists", alertClass: "alert-danger"});
        } else {
            const newUser = new collection({
                name: req.body.name,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password
            });
            await newUser.save();
            resp.redirect('/login');
        }
    } catch (error) {
        console.log("An error occurred:", error);
        resp.render('index', { message: "Something went wrong. Please try again later." ,alertClass: "alert-danger"});
    }
});

// Login route
router.get("/login", (_, resp) => {
    resp.render('login'); 
});

router.post("/login", async (req, resp) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            resp.render('login', { message: "Email does not exist", alertClass: "alert-danger" });
        } else {
            if (user.password === req.body.password) {
                resp.redirect(`/dashboard/${user._id}`);
            } else {
                resp.render('login', { message: "Incorrect password", alertClass: "alert-danger" });
            }
        }
    } catch (error) {
        console.log("An error occurred:", error);
        resp.render('login', { message: "Something went wrong. Please try again later.", alertClass: "alert-danger" });
    }
});

 

module.exports = router;
