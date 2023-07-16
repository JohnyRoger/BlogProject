const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//ścieżki(Routes) GET:
router.get('', async (req, res) =>{
    try {
    const locals = {
        title: "Fajny Blog",
        description: "Blog stworzony przy pomocy Node, Express i MongoDB."
    }

    let perPage = 2;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 }}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) +1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null
    });

    }catch (error) {
        console.log(error);
    }
});



router.get('/about', (req, res) =>{
    res.render('about');
});

module.exports = router


// testowe dane
/*'function insertPostData() {
    Post.insertMany([
        {title: "Tytuł1",
        body:"Tekst1"
        },
        {title: "Tytuł2",
        body:"Tekst2"
        },
        {title: "Tytuł3",
        body:"Tekst3"
        },
    ])
}

insertPostData();' */

/*
    try {
        const data = await Post.aggregate([{ $sort: { createdAt: -1 }}])
        res.render('index', { locals, data} );
    }catch (error) {
        console.log(error);
    }
*/