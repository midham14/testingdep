const nodemailer = require('nodemailer')

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'idhamdummy3@gmail.com',
        pass:'fwfmycwvxtpbgrno'
    },
    tls:{
        rejectUnauthorized:false
    }

})


module.exports=transporter