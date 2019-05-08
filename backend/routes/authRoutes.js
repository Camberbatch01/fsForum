const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/googleRedirect', passport.authenticate('google') ,(req, res) => {
    res.redirect('http://localhost:3000/user/dashboard?token=' + req.user.token);
});

router.get('/github', (req, res) => {
    res.send('logging in with github');
});

router.get('/facebook', (req, res) => {
    res.send('logging in with facebook');
});

module.exports = router;