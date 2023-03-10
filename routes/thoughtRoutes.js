const router = require('express').Router();

// GET ALL localhost:3001/thoughts
router.get('/', (req, res) => {
    res.send('hello world')
});

// GET ALL localhost:3001/thoughts/:id
router.get('/:id', (req, res) => {
    res.send(req.params.id)
});

// POST new localhost:3001/thoughts
router.post('/', (req, res) => {

});

// PATCH one localhost:3001/thoughts/:id
router.patch('/', (req, res) => {

});

// DELETE ALL localhost:3001/thoughts/:id
router.delete('/', (req, res) => {

});
module.exports = router;