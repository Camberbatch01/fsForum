const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
});

router.get('/local', passport.authenticate('local', {failureRedirect: '/'}));

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/googleRedirect', passport.authenticate('google') ,(req, res) => {
    res.redirect('http://localhost:3000/user/dashboard?token=' + req.user.token);
});

router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}));

router.get('/githubRedirect', passport.authenticate('github') ,(req, res) => {
    res.redirect('http://localhost:3000/user/dashboard?token=' + req.user.token);
});


module.exports = router;