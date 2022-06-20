const Router = require('express')
const router = new Router()
const orderController = require("../controllers/orderConroller")
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', orderController.addOrder)
router.get('/', orderController.getAll)
router.get('/user/:id',  orderController.getUserOrder)
router.get('/:id', orderController.getUserOrderList)




module.exports = router