const router = require('express').Router()
const AdminRouter = require('./adminRouter')
const { Controllers } = require('../controllers/index')

const session = require('express-session')
const loginRouter = require('./login')
const registerRouter = require('./register')


router.use(session({
    secret: "sneakergeek",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3000000 }
}))



//ini home
router.get('/', Controllers.home)

//ini checkout 
router.get('/checkout/:id', Controllers.checkout)
router.post('/checkout/:id', Controllers.CreateBill)

router.get('/history', Controllers.getHistory)


// login
router.use('/login', loginRouter)
//register
router.use('/register', registerRouter)
//admin
router.use('/admin', AdminRouter)



module.exports = router