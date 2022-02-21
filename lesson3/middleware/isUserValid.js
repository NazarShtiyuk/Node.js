function isUserValid (req, res, next) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            throw new Error('email or password isn`t provided');
        }

        if (password.length < 5) {
            throw new Error('not valid password');
        }

        next();

    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message)
    }
}

module.exports = isUserValid;