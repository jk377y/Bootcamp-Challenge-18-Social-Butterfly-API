const router = require('express').Router();

// GET ALL localhost:3001/thoughts
router.get('/', (req, res) => {
    res.send('localhost:3001/api/thoughts <br> GET ALL')
});

// GET ALL localhost:3001/thoughts/:id
router.get('/:id', (req, res) => {
    res.send('localhost:3001/api/thoughts/:id <br> GET ONE')
});
// POST new localhost:3001/thoughts
router.post('/:id', (req, res) => {

});

// PATCH one localhost:3001/thoughts/:id
router.put('/:id', (req, res) => {

});

// DELETE ALL localhost:3001/thoughts/:id
router.delete('/:id', (req, res) => {

});
module.exports = router;