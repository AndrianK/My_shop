const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), typeController.create)
router.post('/del/:id', checkRole('ADMIN'), typeController.delOne)
router.post('/upd/:id',checkRole('ADMIN'), typeController.Update)
router.post('/hide/:id',checkRole('ADMIN'), typeController.Hide)

router.get('/', typeController.getAll)

module.exports = router
