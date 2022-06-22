const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), deviceController.create)
router.post('/update',checkRole('ADMIN'), deviceController.setDescription)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/update/:id',checkRole('ADMIN'), deviceController.updated)
router.post('/del/:id',checkRole('ADMIN'), deviceController.delOne)

module.exports = router