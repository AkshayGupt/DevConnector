const nodemailer = require("nodemailer");
 


let transporter =nodemailer.createTransport({

    service:'gmail',

    auth:{
        user:'',
        pass:''
    }
});

let mailOptions={
    from='dangerous.akshaygupta@gmail.com',
    to:'hihellobyeankit@gmail.com',
    subject:'Welocme to BikerWiker',
    text:'Thank you for registering with us.'
};


transporter.sendMail(mailOptions , function(err,data){
    if(err)
    console.log('error occurs');
    else
    console.log('Email Sent!!');
});