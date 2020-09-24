'use strict'
const {Product} = require('../models')
const uploader = require('../helpers/uploader')


class AdminController{
    static getHomeAdminHandler(req,res){
        let level = req.session.level
        if(level === 'admin'){
            Product.findAll({order:[['id','asc']]})
            .then(data=>res.render('homeAdmin',{data}))
            .catch(err=>res.send(err))
        }else{
            res.render('noAccess')
        }
    }

    static formAddProductHandler(req,res){
        let level = req.session.level
        if(level === 'admin'){
        res.render('formAddProduct')
        }else{
            res.render('noAccess')
        }
    }

    static addProductHandler(req,res){
        let level = req.session.level
        if(level === 'admin'){
            try{
                const upload = uploader('SNEAKERSPRODUCT').fields([{name:'image'}])
                upload(req,res,err=>{
                    if(err){
                        console.log('gagal upload',err)
                        return res.send(err)
                    }
                    const {name,description,price} = req.body
                    const { image } = req.files
                    const imagePath = image ? '/' + image[0].filename : null
                    let newProduct = {
                        name,
                        description,
                        price:Number(price),
                        image:imagePath
                    }
                    Product.create(newProduct)
                        .then(()=>res.redirect('/admin'))
                        .catch((err)=>res.send(err))
                })
            }catch(err){
                res.send(err)
            }
        }else{
            res.render('noAccess')
        }
    }

    static formEditProductHandler(req,res){
        let level = req.session.level
        let id = Number(req.params.id)
        if(level === 'admin'){
        Product.findByPk(id)
            .then(data=>res.render('formEditProduct',{data}))
            .catch(err=>res.send(err))
        }else{
            res.render('noAccess')
        }
    }
    
    static editProductHandler(req,res){
        let level = req.session.level
        if(level === 'admin'){
            try{
                const upload = uploader('SNEAKERSPRODUCT').fields([{name:'image'}])
                upload(req,res,err=>{
                    if(err){
                        console.log('gagal upload',err)
                        return res.send(err)
                    }
                    const {name,description,price} = req.body
                    let id = Number(req.params.id)
                    console.log('masuk')
                    const { image } = req.files
                    const imagePath = image ? '/' + image[0].filename : null
                    let editedProduct = {
                        name,
                        description,
                        price:Number(price),
                        image:imagePath
                    }
                    Product.update(editedProduct,{ where:{id}})
                    .then(()=>{
                        res.redirect('/admin')
                    })
                    .catch(err=>{
                        console.log(err)
                        res.send(err)
                    })
                })
            }catch(err){
                res.send(err)
        }
        }else{
            res.render('noAccess')
        }

    }

    static deleteProductHandler(req,res){
        let level = req.session.level
        let id = Number(req.params.id)
        if(level === 'admin'){
            Product.destroy({where:{id}})
                .then(()=>res.redirect('/admin'))
                .catch(err=>res.send(err))
        }else{
            res.render('noAccess')
        }
    }
}


module.exports = AdminController