const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const auth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Chưa đăng nhập"
        });
    }

    const token = authorization.split(" ")[1];

    try {
        const user = jwt.verify(token, jwtConfig.secret);

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Token không hợp lệ"
        });
    }
};

module.exports = auth;