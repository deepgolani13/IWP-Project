const express = require('express');
const router = express.Router();
//const expressLayouts = require('express-ejs-layouts');
// router.get('/', (req, res) => {
//     res.render('main', {});
// });

const mongoschema = require('../models/User')


router.route('/').get((req, res) => {
    res.render('main', { title: "hi" });
})

module.exports = router;