const jwt = require('jsonwebtoken')

async function AuthArtist(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: " Unauthorize "
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role !== "artist") {
            return res.status(403).json({
                messsage: "You don't have access"
            })
        }

        req.user = decode

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorize error"
        })
    }
}


async function AuthUser(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: " Unauthorize "
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (decode.role !== "user") {
            return res.status(403).json({
                messsage: "You don't have access"
            })
        }

        req.user = decode

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorize error"
        })
    }

}

module.exports = { AuthArtist, AuthUser }