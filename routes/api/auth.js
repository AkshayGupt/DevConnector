const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc Test route
// @access PUBLIC
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

// @route GET api/auth
// @desc Authenticate User log in & return web token
// @access PUBLIC
router.post("/", 
[
    check('email', 'This must be a valid password').isEmail(),
    check('password', 'Password is required').exists()
]
,
    async (req, res) => {
        console.log("checking ->->")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password); // bcrypt compare function matches plain password with hashed password

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }


            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload,
                "mysecrettoken", {
                    expiresIn: 36000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Server error!!");
        }
    });


module.exports = router;