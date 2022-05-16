const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')



//Reading
//GET/task?completed=true
//GET/task?limit=10&skip=20
//GET/task?sortBy= createdAt:desc/asc
router.get('/tasks',auth,async(req,res)=>{
    const match = {}
    const sort={}

    if(req.query.completion){
        match.completion = req.query.completion === 'true'
    }

    if(req.query.sortBy ){ 
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc' ? -1 : 1

    }
    try{
        //const tasks= await Task.find({owner: req.user._id})
        //OR we can also use ↓ method
         await req.user.populate({
             path: 'tasks',
             match,
             options:{
                 limit: parseInt(req.query.limit),
                 skip:parseInt(req.query.skip),
                 sort
             }

         })

        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id

    try{
        const task= await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


//Updating

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates= Object.keys(req.body)
    const updateAllowed = ['description','completion']
    const isValidOperation= updates.every((update)=>  updateAllowed.includes(update))

    if(!isValidOperation){
        return res.status(400).send('Error: Not Valid Operation')
    }

    try{
        const task = await Task.findOne({_id: req.params.id ,owner: req.user._id})

       
        
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=> task[update]= req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})



//Creating 


router.post('/tasks',auth,async(req,res)=>{                         //For Create Task
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }

})


//Deleting


router.delete('/tasks/:id',auth,async(req,res)=>{                                               //Deleting a task
    try{
        const task= await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send('Error')
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)

    }
})

module.exports = router