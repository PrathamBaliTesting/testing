const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
})

// const me = new User({
//     Name:'     Pratham    ',
//     Email:'prathambaliyan012@gmail.com    ',
//     Password:'    pb7238901   '

// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('error',error)
// })
