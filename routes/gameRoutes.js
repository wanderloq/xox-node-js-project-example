const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', (req, res) => {
    res.render('game');  
});

router.get('/state', gameController.getGameState);

router.post('/make-move/:index', gameController.makeMove);

router.post('/reset', gameController.resetGame);

module.exports = router;
