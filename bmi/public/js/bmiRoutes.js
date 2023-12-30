const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('/public/views/index.html', { root: __dirname + '/../' });
});

router.post('/bmi', (req, res) => {

    res.send(req.body);
});

module.exports = router;
