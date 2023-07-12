const express = require('express');
const router = express.Router();


//ścieżki(Routes)
router.get('', (req, res) =>{
    const locals = {
        title: "Fajny Blog",
        description: "Blog stworzony przy pomocy Node, Express i MongoDB."
    }

    res.render('index', { locals } );
});
router.get('/about', (req, res) =>{
    res.render('about');
});

module.exports = router;