const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require("../middleware/checkRoleMiddleware");
const deviceController = require("../controllers/deviceController");


router.post('/', checkRole('ADMIN'), typeController.create)
router.post('/del/:id', checkRole('ADMIN'), typeController.delOne)
router.post('/update/:id',checkRole('ADMIN'), typeController.Update)
router.get('/', typeController.getAll)

module.exports = router
