const { Order, OrderDevice, BasketDevice, Device} = require("../models/models")

class OrderController {
    // ------ CRUD корзины ------ //

    async addOrder(req,res,next){

        let newOrder = {
            userId: req.body.id ,
            phone: req.body.phone,
            postcode: req.body.postcode,
            addressee: req.body.addressee
        }
        const order = await Order.create(newOrder)

        const basket = await BasketDevice.findAll({ where: {basketId: req.body.id}})
        basket.forEach(i =>
            OrderDevice.create({
                orderId: order.id,
                deviceId: i.deviceId,
                basketId: i.id,
            }),
        await BasketDevice.destroy({where: {basketId: req.body.id}})
        )
        res.status(201).json(order)
    }

    async getAll(req,res){
        const order = await Order.findAll()
        return res.json(order)
    }

    async getUserOrder(req,res){
        const {id} = req.params
        const date = await Order.findAll({where: {userId: id}} )
          // delete the dot and everything after

        return res.json(date)
    }
    async getUserOrderList(req,res){
        const {id} = req.params
        const date = await Order.findOne( {where: {id: id}})
        const a =  await OrderDevice.findAll({include: {
                model: Device
            }, where: {orderId: id}});
        return res.json(a)
    }
}

module.exports = new OrderController()