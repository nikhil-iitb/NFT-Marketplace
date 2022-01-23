let refreshTokens = []
function generateRefreshToken(user) {
const refreshToken = 
jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
refreshTokens.push(refreshToken)
return refreshToken
}

module.exports = generateRefreshToken;