const router = require('express').Router()
const {AdminController} = require('../controllers')




router.get('/', AdminController.getHomeAdminHandler)
router.get('/addproduct', AdminController.formAddProductHandler)
router.post('/addproduct', AdminController.addProductHandler)
router.get('/editproduct/:id', AdminController.formEditProductHandler)
router.post('/editproduct/:id', AdminController.editProductHandler)
router.get('/delete/:id', AdminController.deleteProductHandler)



module.exports = router