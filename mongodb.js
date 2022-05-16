//CRUD stands for Create Update And Delete

// const mongodb= require('mongodb')
// const MongoClient = mongodb.MongoClient 

const {MongoClient, ObjectId} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databseName = 'task-manager'

// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to Database')
    }

        const db = client.db(databseName)

//         db.collection('users').findOne({name:'Sawan'},(error,user)=>{
//             if(error){
//                 return console.log('Unable')
//             }
//             console.log(user)

        
// })
        // db.collection('users').find({age:21}).toArray((error,user)=>{
        //     console.log(user)
        // })

        // db.collection('Task').findOne({ _id:new ObjectId("62669782447b57b92d9cde44")},(error,Task)=>{
        //     console.log(Task)
        
        
                //  db.collection('Task').updateMany({
                //     Completion:false
                // },{
                //     $set:{
                //         Completion: true
                //     }
                // }).then((result)=>{
                //     console.log(result)
                // }).catch((error)=>{
                //     console.log(error)
                // })
                // db.collection('Task').deleteOne({
                //     completion:false
                // }).then((result)=>{
                //     return console.log(result)
                // }).catch((error)=>{
                //     console.log(error)
                // })
                db.collection('users').insertOne({
                    Name:'Andrew',
                    Age:1
                })
    })
                
         
  


        // db.collection('users').insertOne({
        //     _id:id,
        //     name: 'Sawan',
        //     age: 20
        // }, (error,result)=>{
        //         if(error){
        //             return console.log('Unabel to Get user')
        //         }

        //         console.log(result.insertedId)
      

            // db.collection('users').insertMany([{
            //     name: 'Riya',
            //     age: 21
            // },{
            //     name:'Pragya',
            //     age: 21
            // }],(error,result)=>{
            //     if(error){
            //         return console.log('Unable')
            //     }

            //     console.log(result.insertedIds)
            // })

         
