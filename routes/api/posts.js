const express = require("express");
const router  = express.Router();

// @route GET api/posts
// @desc Test route
// @access PUBLIC
router.get("/",(req,res)=>res.send("POSTS ROUTE"));


module.exports = router;