const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app=express()
const port = process.env.PORT 

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port,()=>{
    console.log('Server is On Port '+ port)
})


// app.use((req,res,next)=>{   
//         if(req.method === 'GET'){
//             res.send('GET requests are disabled')
//         }else{
//             next()
//         }

// })

//This is for service Breakdown Message
// app.use((req,res,next)=>{
//     res.status(503).send('Maintainance Break')
// })

//Use Of Multer and setting up of Multer
// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please Upload word'))
//         }
//         cb(undefined,true)
//     }
// })
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })



//Without middleWare ---->  new request --> run route handler 
//
//With middleware ----> new request -> do something -> run route handler





// const myFucntion = async()=>{
//             const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'})               //sign takes 2 argument one object other string 
//             console.log(token)                                            //object contains the data that will be ambeded in your token


//             const data =jwt.verify(token,'thisismynewcourse')
//             console.log(data)
//             //how to convert a password in hash password
//     // const password = 'Hello231!9'
//     // const hashPassword = await bcrypt.hash(password,8)

//     // console.log(password)
//     // console.log(hashPassword)

//     // const isMatch = await bcrypt.compare('Hello231!9',hashPassword)
//     // console.log(isMatch)
// }

// myFucntion()

// const Task = require('./models/task')
// const async = require('hbs/lib/async')
// const User = require('./models/user')

// const main = async()=>{
//     // const task = await Task.findById('627a59ea148ada8ad98dc0f9')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById('627a589bc5736f86fabfac8e')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()