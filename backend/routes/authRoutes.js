const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/googleRedirect', passport.authenticate('google') ,(req, res) => {
    res.send('hello m8');
});

router.get('/github', (req, res) => {
    res.send('logging in with github');
});

router.get('/facebook', (req, res) => {
    res.send('logging in with facebook');
});

module.exports = router;