
const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)
router.post('/del/:id', checkRole('ADMIN'), brandController.delOne)
router.post('/upd/:id',checkRole('ADMIN'), brandController.Update)
router.post('/hide/:id',checkRole('ADMIN'), brandController.Hide)
router.get('/', brandController.getAll)

module.exports = router
