const router=require('express').Router()
const bcrypt = require('bcrypt')

const Person=require('../models/Person.js')

router.post('/register',async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        // creating a new user
        const newPerson=new Person({
            email:req.body.email,
            password:hashedPassword
        })
        // saving the user
        const person=await newPerson.save()

        console.log('\x1b[42m%s\x1b[0m',"registered successfully")
        res.status(200).json(person.id)
    }catch(err){
        console.log('\x1b[41m%s\x1b[0m',"[FAILED]  cannot register",err)
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    try{
        // find the specific user
        const person=await Person.findOne({email:req.body.email})
        if(!person)
        {    
            console.log('\x1b[41m%s\x1b[0m',"[FAILED]  user not found")    
            res.status(404).json("user not found")
        }
        else{
            // compare the password
            const validPassword=await bcrypt.compare(req.body.password,person.password)
            if(!validPassword)
            {
                console.log('\x1b[41m%s\x1b[0m',"[FAILED]  wrong password")    
                res.status(400).json("wrong password")
            }
            else{
                console.log('\x1b[42m%s\x1b[0m',"logged in successfully")
                res.status(200).json({_id:person._id,email:person.email})
            }
        }
    }
    catch(err){
        console.log('\x1b[41m%s\x1b[0m',"[FAILED]  cannot login",err)
        res.status(500).json(err)
    }
})
module.exports=router