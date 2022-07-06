const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, OrderDevice, Basket, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError');
const {decode} = require("jsonwebtoken");


class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, legalId, amount, country} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName, legalId, amount, country});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setDescription(req, res, next) {
        try {
            let {_id,text} = req.body
           const device = await Device.update(
                {_info: text},
                {where: {id: _id}}
            );
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try{
            let {brandId, typeId, limit, page, role} = req.query
            page = page || 1

            limit = limit || 2

            let offset = page * limit - limit
            let devices;
            if (role == "false") {
                if (!brandId && !typeId) {
                    devices = await Device.findAndCountAll({where: { visuable: true}, limit, offset})
                }
                if (brandId && !typeId) {
                    devices = await Device.findAndCountAll({where: {brandId, visuable: true}, limit, offset,})
                }
                if (!brandId && typeId) {
                    devices = await Device.findAndCountAll({where: {typeId, visuable: true}, limit, offset})
                }
                if (brandId && typeId) {
                    devices = await Device.findAndCountAll({
                        where: {typeId, brandId, visuable: true},
                        limit,
                        offset
                    })
                }
            } else
            {
                if (!brandId && !typeId) {
                    devices = await Device.findAndCountAll({limit, offset})
                }
                if (brandId && !typeId) {
                    devices = await Device.findAndCountAll({where: {brandId}, limit, offset,})
                }
                if (!brandId && typeId) {
                    devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
                }
                if (brandId && typeId) {
                    devices = await Device.findAndCountAll({
                        where: {typeId, brandId},
                        limit,
                        offset
                    })
                }
            }
            return res.json(devices)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async delOne(req, res) {
        const {id} = req.params
        let device
        const order = await OrderDevice.findAll(
            {where: {deviceId: id}}
        )
        const basket = await BasketDevice.findAll(
            {where: {deviceId: id}}
        )
        if(order.length < 1 && basket.length < 1){
        device = await Device.destroy(
            {where: {id: id}}
        ); device = "Пристрій видалено"
        } else device = "Пристрій міститься в корзині, або замовленні. Приховайте товар чи зменшіть кількість до нуля"
        return res.json(device)
    }

    async updated(req, res) {
        const {_id,_amount} = req.body
        const device = await Device.update(
            {amount: _amount},
            {where: {id: _id}}
        )
        return res.json(device)
    }
    async setVisuable(req, res) {
        const {id} = req.params
        let a = true, device;
        const device1 = await Device.findOne({where: {id: id}})
        if (device1.visuable == true) {
        Device.update(
            {visuable: false},
            {where: {id: id}})
            device = "Пристрій приховано з сайту"
        }
        else{  await Device.update(
            {visuable: true},
            {where: {id: id}})
            device = "Пристрій додано на сайт"
        }


        /*const device = await Device.update(
            {visuable: !visuable},
            {where: {id: _id}}
        )*/
        return res.json(device)
    }
}

module.exports = new DeviceController()
