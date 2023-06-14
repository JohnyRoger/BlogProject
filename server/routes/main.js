const express = require('express');
const router = express.Router();


//ścieżki
router.get('', (req, res) =>{ // test aplikacji express server
    res.send("Hello There")
});

module.exports = router;