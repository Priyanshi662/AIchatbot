const express= require('express')
const mongoose= require('mongoose')
const personRoute= require('./routes/persons.js')
const openAIRoute= require('./routes/openai.js')
const env=require('dotenv')
env.config();

// configuration for server
const app=express()
app.use(express.json())


// connect the database
mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );

app.use('/api/persons',personRoute)
app.use('/api/openai',openAIRoute)



// run the server
app.listen(5000,()=>{
    console.log('\x1b[42m%s\x1b[0m',"server is running")
})