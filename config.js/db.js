const mongoose = require('mongoose');
// const config   = require('config');
// const db       = config.get('mongoURI');
const db        = "mongodb+srv://akshay123:akshay123@cluster0-fqlbs.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async()=>{

    try{
        await mongoose.connect(db,{ 
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Mongodb connected ......");
    }
    catch(err)
    {
        
        console.error(error.message);
        process.exit(1);//exit process with failure
    
    }

};


module.exports = connectDB; 