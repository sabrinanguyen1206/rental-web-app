const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const accountModel = require("../models/account.model");

const login = async (req, res) => {
    const { password } = req.body;

    const user = await accountModel.getAccount(req.body);

    if (!user) {
        return res.json({
            status: 400,
            message: "Email không tồn tại"
        });
    }

    if (user.password !== password) {
        return res.json({
            status: 400,
            message: "Sai mật khẩu"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        jwtConfig.secret,
        {
            expiresIn: "7d"
        }
    );
    
    return res.json({
        status: 200,
        message: "Đăng nhập thành công",
        token,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

const register = async (req, res) => {
    const user = await accountModel.createAccount(req.body);

    return res.json({
        status: 200,
        message: "Register success",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

module.exports = {
    login,
    register
};