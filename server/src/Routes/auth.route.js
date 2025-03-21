import express from 'express';

const router = express.Router();

router.route('/signup').post((req, res) => {
    res.send("Signup route");
});

router.route('/login').post((req, res) => {
    res.send("Login route");
})

router.route('/logout').get((req, res) => {
    res.send("Logout route");
})

export default router;