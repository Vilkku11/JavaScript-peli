const router = require('express').Router()
const Score = require('../models/score')

router.get('/', async (req, res) => {
    const score = await Score.find({})
    res.json(score)
})

router.post('/', async (req, res) => {
    const body = await req.body
    console.log(body)
    const score = new Score({
        score: body.score,
        name: body.name
    })
    await score.save()
})

router.put('/:id', async (req, res) => {
    const {score} = req.body
    Score.findByIdAndUpdate(req.params.id, { score }, {new:true, runValidators:true, context:'query' })
    .then(updatedScore => {
        res.json(updatedScore)
    }).catch(e => next(e))
})

router.delete('/:id', async (req, res) => {
    await Score.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = router