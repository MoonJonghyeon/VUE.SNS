const express = require('express');
const multer = require('multer')
const path = require('path');
const db = require('../models');

const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads')
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext)
            done(null, basename + Date.now() + ext)
        }
    }),
    limit: {fileSize: 20 * 1024 * 1024}
})

router.post('/images', isLoggedIn, upload.array('image'), (req ,res) => {
    console.log(req.file)
    return res.json(req.files.map(v => v.filename))
})

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        req.body.content,
        req.body.imagePaths
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id
        })
        if(hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
                where: { name : tag.slice(1).toLowerCase}
            })))
            await newPost.addHashtags(result.map(r => r[0]));
        }
        if(req.body.image) {
            if(Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({ src: image, PostId: newPost.id })
                }))
            } else {
                const image = await db.Image.create({ src: req.body.image, PostId: newPost.id})
            }
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Image,
            }],
        })
        return res.json(fullPost)
    } catch (err) {
        console.error(err)
        next(err)
    }
    
})

router.delete('/:id', async (req, res, next) => {
    try {
        await db.Post.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.send('delete successful')
    } catch (err) {
        console.error(err)
        next(err)
    }
})

router.get('/:id/comments', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: {id: req.params.id }})
        if(!post) {
            return res.status(404).send('not existing comment')
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id
            },
            inclue: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }],
            order: [['createdAt', 'ASC']]
        })        
        return res.json(comments)
    } catch (err) {
        console.error(err)
        next(err)
    }
})

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id}})
        if(!post) {
            return res.status(404).send('not existing post')
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content
        })
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }]
        })
        return res.json(comment)
    } catch (err) {
        console.error(err)
        next(err)
    }

})

module.exports = router;