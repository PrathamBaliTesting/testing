require('../src/db/mongoose')

const async = require('hbs/lib/async')
const User = require('../src/models/user')

//62686f35191a0800336c0d6a


// User.findByIdAndUpdate('626b096c5555ca92ed0302f3',{Age: 19}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({Age: 19})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async(id , Age)=>{
    const user = await User.findByIdAndUpdate(id,{ Age})
    const count = await User.countDocuments({Age})
    return count
}

updateAgeAndCount('626b096c5555ca92ed0302f3',25).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})