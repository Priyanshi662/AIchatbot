const router= require('express').Router()

const {Configuration,OpenAIApi}=require('openai')
const config=new Configuration({
    organization:process.env.OPEN_AI_ORG,
    apiKey:process.env.OPEN_AI_KEY
})
const openAi=new OpenAIApi(config);

router.post("/generateImage",async(req,res)=>{
    try{
        const response=await openAi.createImage({
            prompt:req.body.prompt,
            n: 1,
            size: '256x256',
            response_format: 'b64_json'
        },
        {
            headers:{
                'Authorization':`Bearer ${process.env.OPEN_AI_KEY}`,
                'Content-Type':'application/json'
            }
        })
        
        const imageURL=response.data.data[0].url
        console.log('\x1b[42m%s\x1b[0m',"image generated successfully")
        res.status(200).json(imageURL)
    }
    catch(err)
    {
        console.log('\x1b[41m%s\x1b[0m',"[FAILED] Logging in with a user",err)
        res.status(500).json(err)
    }
})

module.exports=router;