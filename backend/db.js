const mongoose= require('mongoose');

const mongoURI= "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const connectToMongo =()=>{
    mongoose.connect('mongodb://0.0.0.0:27017/dbfordnotebook', {useNewUrlParser: true});
    mongoose.connection
        .once('open', ()=> console.log('Connected'))
        .on('error', (error)=> {
            console.log("Error is", error);
        })
};


// const server = "mongodb://localhost:27017";
// const database= 'dnotebook';

// const connectToMongo = async () =>{
//     try{
//         await mongoose.connect(`mongodb://${server}/${database}`);
//         console.log("Connected ");
//     }catch(err){
//         console.log('Failed',err);
//     }
// };

module.exports=connectToMongo;