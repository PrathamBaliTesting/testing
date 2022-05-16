require('../src/db/mongoose')

const async = require('hbs/lib/async')
const Task = require('../src/models/task')

//62687a571d3a159814102a77

// Task.findByIdAndDelete('62687a571d3a159814102a77',{Completion: false}).then((task)=>{
//     console.log(task)
//     return Task.countDocuments({Completion: false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async(id,Completion)=>{
    const del = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({Completion})
    return count
}

deleteTaskAndCount('6273ec469029a6d1e8bab37f',true).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})