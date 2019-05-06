const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Connected and working");
});
router.get('/create', (req, res, next) => {
    res.send("Create?");
})

module.exports = router;