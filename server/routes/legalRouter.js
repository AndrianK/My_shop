const Router = require('express')
const router = new Router()
const legalController = require("../controllers/legalController")
const authMiddleware = require("../middleware/authMiddleware");

router.post('/new', legalController.create)
router.get('/', legalController.showAll)
router.get('/:id', legalController.show)

module.exports = router