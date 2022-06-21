const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), deviceController.create)
router.post('/update',checkRole('ADMIN'), deviceController.setDescription)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.get('/update/:id', deviceController.update)
router.post('/del/:id',checkRole('ADMIN'), deviceController.delOne)

module.exports = router