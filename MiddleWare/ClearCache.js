const { ClearCache } = require('../Services/cache')
const ClearHashKey = async (req, res, next) => {
    await next();
    console.log("Clearing Redis Cache... :)")
    ClearCache(req.user.ID)
}

module.exports = {
    ClearHashKey
}