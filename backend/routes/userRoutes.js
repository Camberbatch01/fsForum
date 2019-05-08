const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user){
        res.redirect('http://localhost:3000');
    } else {
        next();
    }
}

router.get('/dashboard', authCheck, (req, res) => {
    res.send('you are logged in '+ req.user.username);
});

module.exports = router;