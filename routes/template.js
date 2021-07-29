const { Router } = require('express');
const db = require('../database/database');

const router = Router();

router.get('/test', async (req, res) => {
    //const results = await db.promise().query(`QUERY`);
    res.status(200).send(results);
});

module.exports = router;