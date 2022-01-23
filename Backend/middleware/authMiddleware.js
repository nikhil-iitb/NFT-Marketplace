const jwt = require("jsonwebtoken");
const { identity } = require("lodash");

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    // check for token existence and validity
    if(token) {
        jwt.verify(token, 'Athena designed by Ayushman Choudhary', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                window.location.href="/login";
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        window.location.href="/login";
    }
}

// check User
const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;

    // check for token existence and validity
    if(token) {
        jwt.verify(token, 'Athena designed by Ayushman Choudhary', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user= null;
                next();
            } else {
                console.log(decodedToken);
                const sqlSearch = "Select * from user_info where email = ?";
                const search_query = mysql.format(sqlSearch, [decodedToken.id]);
                let user = await connection.query(search_query);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }

}
module.exports = {requireAuth, checkUser};