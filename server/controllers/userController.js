const { User } = require('../models')
const createError = require('http-errors')

const jwt = require('../helpers/jwt')
const bcrypt = require('bcrypt')

class UserController {
    static createUser(req, res, next) {
        const { name, email, password } = req.body
        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user) {
                    throw createError(400, 'Email already Exist')
                } else {
                    return User.create({
                        name,
                        email,
                        password,
                        role: 'Member'
                    })
                }
            })
            .then(user => {
                res.status(201).json({ name: user.name, email: user.email, role: user.role })
            })
            .catch(next)
    }

    static loginUser(req, res, next) {
        const { email, password } = req.body


        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    let objUser = {
                        id: user.id,
                        email: user.email,
                        role: user.role
                    }

                    let token = jwt.generateToken(objUser)
                    res.status(200).json({ token })
                } else {
                    next(createError(400, 'Incorrect Email or Password'))
                }
            })
            .catch(next)
    }
}

module.exports = UserController