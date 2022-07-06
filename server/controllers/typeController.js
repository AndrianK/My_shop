
const {Type, OrderDevice, BasketDevice, Device, Brand} = require('../models/models');


class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delOne(req, res) {
        const {id} = req.params
        let device
        const devices = await Device.findAll(
            {where: {typeId: id}}
        )

        if(devices.length < 1 ){
            device = await Type.destroy(
                {where: {id: id}}
            ); device = "Категорію видалено"
        } else device = "Категорія містить пристрої, змініть назву або зробіть категорію скритою"
        return res.json(device)
    }
    async Update(req, res) {
        const {_id,_name} = req.body
        const device = await Type.update(
            {name: _name},
            {where: {id: _id}}
        )
        return res.json(device)
    }

}

module.exports = new TypeController()
