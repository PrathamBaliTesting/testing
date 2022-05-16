const express = require('express')
const async = require('hbs/lib/async')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const e = require('express')
const sharp = require('sharp')
const {sendWelcomeEmail} = require('../emails/account')
const {sendGoodByeEmail} = require('../emails/account')


router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
        
    }catch(e){
        console.log('Error in router line 19 in user',e)
        res.status(400).send()
    }
   
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutALL',auth,async(req,res)=>{
      try{
        req.user.tokens = []
        await req.user.save()
        res.send()
      }catch(e){
          res.status(500).send()

      }
})
router.get('/users/me',auth ,async(req,res)=>{                         //For Read User/task
    
    res.send(req.user)

})



router.patch('/users/me',auth,async(req,res)=>{                                                //this For Update  Users                 
    const updates = Object.keys(req.body)                                                             //this is for when a object is not there and user req to update other than given one
    const allowedUpdates =['name','email','age','password']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(404).send('Error: Invalid Operation!!')
    }
    try{
        

        updates.forEach((update)=> req.user[update]= req.body[update])

        await req.user.save()

        
        // if(!user){
            
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }catch(e){
        console.log('Error in user router line 64',e)  
        res.status(400).send()
        
    }
})
router.post('/users',async(req,res)=>{                  //For Create User 
    const user = new User(req.body)
    try{
     await user.save()
     sendWelcomeEmail(user.email, user.name)
     const token = await user.generateAuthToken()
     res.status(201).send({user,token})
 }catch(e){
     console.log('error is in line 91 user',e)
     res.status(500).send(e)
 
 }
 
})

const upload = multer({             //this will make the directory
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Upload File in jpg ,jpeg and png format'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth,upload.single('avatar'), async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width: 250 , height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }catch(e){

    }
})

router.delete('/users/me',auth,async(req,res)=>{                                           //Deleting a user
    try{
        
        // const user= await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send('Error')
        // }
        await req.user.remove()
        sendGoodByeEmail( req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router