const express = require("express");
const router  = express.Router();
const auth = require("../../middleware/auth");
const { check,validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/me
// @desc Test route
// @access PUBLIC
router.get("/me",auth, async(req,res)=>{

    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
        if(!profile)
        {
            return res.status(400).json({ msg: 'Ther is no profile for this user'});
        }
        res.json(profile);
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send("Server error");
    }
  
}
);


// @route POST api/profile
// @desc Create or Update User Profile
// @access PRIVATE
router.post("/",
[
    auth,
    [
        check('status','Status is required').not().isEmpty(),
        check('skills','Skills is required').not().isEmpty()
    ]
], 
async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }
  
    const {
        company,
        website,
        location,
        status,
        bio,
        githubusername,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        skills,
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;

    if (typeof skills !== 'undefined' && typeof skills === 'string') {
        profileFields.skills = skills.split(',');
      }

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;


    try{

        let profile = await Profile.findOne({user: req.user.id});

        if(profile)
        {
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields },
                {new :true}
                );

            return res.json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    }catch(err)
    {
        console.error(err.message);
        res.status(400).json({msg: "No Profile Found Of the selected user!!"}); 
    }
    // console.log(profileFields.skills);
    // res.send("Profile Updated!!");

}

);
// @route GET api/profile/all
// @desc get all profiles
// @access PUBLIC 
router.get("/",async (req,res)=>{

    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/profile/user/:user_id
// @desc get user profile
// @access PUBLIC
router.get("/user/:user_id",async (req,res)=>{

    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        
        

        if(!profile)
        {
           return res.status(400).json({msg:'Profile not found'});
        }
        res.json(profile);

    } catch (err) {

        if(err.kind === 'ObjectId')
        {
            return res.status(400).json({msg:'Profile not found'});
        }
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route DELETE api/profile/
// @desc delete  profile , user,posts
// @access Private 
router.delete("/",auth,async (req,res)=>{

    try {
        //@todo - remove user posts
        //Remove profile
        await Profile.findOneAndRemove({ user:req.user.id });
        await User.findOneAndRemove({ _id:req.user.id });

        res.json('User Removed');
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//@route PUT api/profile/experience
//@desc add profile experience
//@access Private
router.put("/experience",
[
    auth,
    [
        check('title','title is required').not().isEmpty(),
        check('company','company is required').not().isEmpty(),
        check('from','from is required').not().isEmpty()
    ]
]
    ,async function(req,res){

        const errors= validationResult(req);
        if(!errors.isEmpty())
        {
           return res.status(400).json({errors:errors.array()});
        }

        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp={
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } 
        try {
            const profile = await Profile.findOne({user:req.user.id});
            
            profile.experience.unshift(newExp); // unshift is almost similar to push but unlike push it pushes new data upwards

            await profile.save();

            res.json(profile);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    


});

//@route DELETE api/profile/experience/:exp_id
//@desc delete profile experience
//@access Private

router.delete("/experience/:exp_id",auth, async(req,res)=>{

     try {
         const profile= await Profile.findOne({user:req.user.id});
         
         //Get Remove Index
         const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
         profile.experience.splice(removeIndex, 1);
         await profile.save();

         res.json(profile);
          
     } catch (err) {
         console.error(err.message);
         res.status(500).send("Server error");
     }
});

//@route PUT api/profile/education
//@desc add profile education
//@access Private
router.put("/education",
[
    auth,
    [
        check('school','school is required').not().isEmpty(),
        check('degree','degree is required').not().isEmpty(),
        check('fieldofstudy','fieldofstudy is required').not().isEmpty(),
        check('from','from is required').not().isEmpty()
    ]
]
    ,async function(req,res){

        const errors= validationResult(req);
        if(!errors.isEmpty())
        {
           return res.status(400).json({errors:errors.array()});
        }

        const{
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu={
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } 
        try {
            const profile = await Profile.findOne({user:req.user.id});
            
            profile.education.unshift(newEdu); // unshift is almost similar to push but unlike push it pushes new data upwards

            await profile.save();

            res.json(profile);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    


});

//@route DELETE api/profile/education/:edu_id
//@desc delete profile education
//@access Private

router.delete("/education/:edu_id",auth, async(req,res)=>{

     try {
         const profile= await Profile.findOne({user:req.user.id});
         
         //Get Remove Index
         const removeIndex = profile.education
         .map( item  => item.id)
         .indexOf(req.params.edu_id);
         
        //  console.log(removeIndex);

         profile.education.splice(removeIndex, 1);
         await profile.save();

         res.json(profile);
          
     } catch (err) {
         console.error(err.message);
         res.status(500).send("Server error");
     }
});

module.exports = router;