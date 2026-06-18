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

    return res.json({
        status: 200,
        message: "Đăng nhập thành công",
        data: user
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