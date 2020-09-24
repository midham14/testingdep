const { User } = require('../models')
const session = require('express-session')

class LoginController {
    static loginForm(req, res) {
        if (req.query.err) {
            res.render('login', { errorLogin: true })
        } else {
            res.render('login', { errorLogin: false })
        }
    }

    static login(req, res) {
        User.findOne({
            where: {
                name: req.body.name,
                password: User.passwordHash(req.body.password)

            }
        })
            .then(user => {
                if (user === null) {
                    res.redirect('/login?err=true')
                } else {
                    req.session.isLogin = true
                    req.session.userId = user.id
                    req.session.name = user.name
                    req.session.email = user.email
                    req.session.address = user.address
                    req.session.level = user.level
                    if(user.level === 'user'){
                        res.redirect('/')
                    }else if(user.level === 'admin'){
                        res.redirect('/admin')
                    }
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.isLogin = false
        res.redirect(`/login`)
    }
}

module.exports = LoginController