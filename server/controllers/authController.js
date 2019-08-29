
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const {username, password, isAdmin} = req.body
    const db = req.app.get('db')

    const result = await db.get_user([username])
    const existingUser = result[0]

    //does that username exist?
    if(existingUser) return res.status(409).send('Username taken')

    //if the name doesn't exist
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const registeredUser = await db.register_user([isAdmin, username, hash])
    const user = registeredUser[0]

    req.session.user = {
        isAdmin:user.is_Admin, 
        id:user.id, 
        username:user.username
    }

    res.status(201).send(req.session.user)

}

const login = async (req, res) => {
    const {username, password} = req.body
    const db = req.app.get('db')
    const foundUser = await db.get_user([username])
    const user = foundUser[0]

    console.log(user)
    //does the user even exist?
    if(!user) return res.status(401).send("Username does not exist")

    //authenticate the user
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    
    //is the password wrong?
    if(!isAuthenticated) return res.status(403).send('Invalid Password')

    req.session.user = {
        isAdmin: user.is_admin, 
        id:user.id,
        username:user.username
    }
    res.status(200).send(req.session.user)
}

const logout = async (req, res) => {
    req.session.destroy()
    res.status(200).send('You have logged out')

}

module.exports = {
    register,
    login,
    logout
}