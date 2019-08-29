const usersOnly = (req, res, next) => {
    if(!req.session.user) return res.status(401).send('Please Log in.')
    next()
}

const adminsOnly = (req, res, next) => {
    if(!req.session.user.isAdmin) res.status(403).send('Admin Access Only')
    next()
}

module.exports = {
    usersOnly,
    adminsOnly
}