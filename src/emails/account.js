const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'prathambaliyan012@gmail.com',
        subject:'Thanks For Joining in',
        text:`Welcome to the app, ${name}. Let me Know how you get along with the app`
    })
}


const sendGoodByeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'prathambaliyan012@gmail.com',
        subject:'Goodbye',
        text:`Thanks For being on this journey, ${name}.`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail

}




// sgMail.send({
//     to: 'paddisingh012@gmail.com',
//     from: 'prathambaliyan012@gmail.com',
//     subject:'This is my first creation',
//     text:'This one actually gets to you.'
// })