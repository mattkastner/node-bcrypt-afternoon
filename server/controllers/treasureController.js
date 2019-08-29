const dragonTreasure = async (req, res) => {
    const db = req.app.set('db')
    const findTreasure = await db.get_dragon_treasure([1])
    return res.status(200).send(findTreasure)
}

const getUserTreasure = async (req, res) => {
    const {id} = req.params

    const db = req.app.set('db')
    const findTreasure = await db.get_user_treasure([id])

    return res.status(200).send(findTreasure)
}

const addUserTreasure = async (req, res) => {
    const { treasureURL } = req.body;
    const { id } = req.session.user;
    const userTreasure = await req.app.get('db').add_user_treasure([treasureURL, id]);
    return res.status(200).send(userTreasure);
}

const getAllTreasure = async (req, res) => {
    const db = req.app.set('db')
    const findTreasure = await db.get_all_treasure()

    res.status(200).send(findTreasure)
}

module.exports = {
    dragonTreasure,
    getUserTreasure,
    addUserTreasure,
    getAllTreasure
}