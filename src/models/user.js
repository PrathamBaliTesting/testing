const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')              //bcrypt is used for hashed Paswword
const async = require('hbs/lib/async')
const jwt = require('jsonwebtoken') 
const Task = require('./task')            //jwt is used for tokens



const userSchema = new mongoose.Schema({                        //user is object
    name:{
            type: String,
            required:true,
            trim:true                                        //trim helps to remove the spaces between name
        },
    email:{
        type: String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not Valid')
            }
        }
        },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.includes('password')){
                    throw new Error('Make A Stong Password')
            }
        }

         },
    age: {
            type: Number,
            default:0,
            validate(value){
                if(value < 0){
                    throw new Error('Age is Not Negative')      //we use this insted of console.log because console will insert the database while giving error
                }
            }
        },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type: Buffer
    }
    
},{
    timestamps: true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'

})
//This Schema is to hide token and password from user 
userSchema.methods.toJSON = function(){
    const user = this 
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.token
    delete userObject.avatar

    return userObject
}
//this schema is for generating Authentication tokens
userSchema.methods.generateAuthToken = async function() {
    const user = this 

    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//This schema for finding a user by its credentials used For Login user
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email})
    

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to Login Type Correct Password')
    }
    return user
}

//Hash The plain text password before saving
userSchema.pre('save',async function(next){
    const user = this

        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8)
        }

    next()
})

//Delete user tasks when user is removed
userSchema.pre('remove',async function(next){
    const  user = this 
    await Task.deleteMany({owner: user._id})


    next()
})
const User = mongoose.model('User',userSchema)



module.exports = User