const AdminController = require('./admin-controller')
const { Product, User, Purchased } = require('../models')
const session = require('express-session')
const { static } = require('express')
const transporter = require('../helpers/mailer')

class Controllers {
    static home(req, res) {
        if (req.session.isLogin == true) {
            let objUser = {
                id: req.session.id,
                name: req.session.name,
                email: req.session.email,
                level: req.session.level,
                address: req.session.address
            }

            Product.findAll()
                .then(data => {
                    res.render('homeBuyer', { data, objUser })
                }).catch(err => res.send(err))
        }
        else {
            res.redirect('/login')
        }
    }

    static checkout(req, res) {
        if (req.session.isLogin == true) {
            let objUser = {

                id: req.session.userId,
                name: req.session.name,
                email: req.session.email,
                level: req.session.level,
                address: req.session.address
            }

            if(req.session.level === 'user'){
            let idProduct = req.params.id
            Product.findByPk(idProduct)
                .then(data => {
                    // res.send(objUser)
                    res.render('checkout', { data, objUser })
                })
                .catch(err => {
                    res.send(err)
                })
            }else{
                res.render('noAccess')
            }
        }else{
            res.render('login')
        }
    }

    static CreateBill(req, res) {
        let purchased = null
        let idProduct = req.params.id
        let userid = req.session.userId

        purchased = {
            UserId: Number(req.session.userId),
            ProductId: Number(idProduct),
            paid: true
        }

        let namaUser
        let emailUser
        let namaProduct
        let hargaProduct

        if(req.session.level === 'user'){


        Product.findByPk(idProduct)
            .then(dataProduct=>{
                namaProduct = dataProduct.name
                hargaProduct = dataProduct.price
                return User.findByPk(userid)
            })
            .then(dataUsers=>{
                namaUser = dataUsers.name
                emailUser = dataUsers.email
                return Purchased.create(purchased)
            })
            .then(()=>{
                let mailOptions={
                    from:'SneakersGeek <idhamdummy3@gmail.com>',
                    to:emailUser,
                    subject:'Purchased Receipt',
                    html:`Terimakasih ${namaUser} Telah Berbelanja di SneakersGeek
                    Anda Berbelanja ${namaProduct} dengan harga ${namaProduct=='Yeeza'?hargaProduct-hargaProduct*0.10:hargaProduct} barang akan dikirim segara
                    Terimakasih.
                    `
                }
                transporter.sendMail(mailOptions,(err,result)=>{
                    if(err){
                        console.log(err,'masuksendmail')
                        res.send(err)
                    } 
                    console.log('berhasil beli')
                    res.redirect('/')

                })
            })
            .catch(err=>{
                res.send(err)
            })
        }else{
            res.render('login')
        }

    }
    static getHistory(req, res) {
        let idUser = +req.session.userId

        // User.findByPk(idUser, {
        //     include: Product
        // })
        //     .then(data => {
        //         console.log(data)
        //         res.render('history', { data })
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })
        console.log(idUser)
        Purchased.findAll({
            where:{UserId:idUser},
            include:[{model:Product},{model:User}]

        })
        .then(data=>{
            res.render('history', { data })
        })
        .catch(err=>{
            console.log(err)
        })

    }
}

module.exports = {
    Controllers,
    AdminController
}
