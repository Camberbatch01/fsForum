const router = require('express').Router();

const authCheck = (req, res, next) => {
    console.log('auth ' + req.isAuthenticated());
    if (req.isAuthenticated()){
        return next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

router.get('/checkAuth', authCheck, (req, res) => {
    res.status(200).send('Access Granted');
})

router.get('/dashboard', authCheck, (req, res) => {
    res.send(req.user);
});

module.exports = router;