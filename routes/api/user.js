const express = require("express");
const router  = express.Router();
const gravatar =  require('gravatar'); 
const jwt      =  require('jsonwebtoken');
const bcrypt  = require("bcryptjs");
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');//Using user model

// @route GET api/user
// @desc Test route
// @access PUBLIC
router.post("/",[
    check('name').not().isEmpty(),
    check('email','This must be a valid password').isEmail(),
    check('password','Length must be greater than 6').isLength({
        min:6
    })
],
async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()}); 
    }


const { name,email,password } = req.body;

try{
    let user = await User.findOne({ email });
    if(user) {
       return res.status(400).json({errors:[{ msg: "User already exists" }]});
    }
    const avatar =gravatar.url(email,{
        s : '200',
        r: 'pg',
        d: 'mm'
    })
    //Creating instance of the user (does not save ,just a instance)
    user = new User({
        name,
        email,
        avatar,
        password
    });
    //Hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);

    await user.save();

    const payload = {
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,
        "mysecrettoken",{
            expiresIn:36000
        },
        (err,token)=>{
            if(err) throw err;
            res.json({token});
        });
}
catch(err)
{
 console.error(err.message);
 res.status(500).send("Server error!!");
}
});

module.exports = router;