
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
        let mess
        const devices = await Device.findAll(
            {where: {typeId: id}}
        ) 

        if(devices.length < 1 ){
            mess = await Type.destroy(
                {where: {id: id}}
            ); mess = "Категорію видалено"
        } else mess = "Категорія містить пристрої, змініть назву або зробіть категорію скритою"
        return res.json(mess)
    } 

    async Update(req, res) {
        const {id} = req.params
        let {name} = req.body
        const result = await Type.update(
            {name: name},
            {where: {id: id}}
        )
        return res.json(result)
    }

    async Hide(req, res) {
        const {id} = req.params
        const type = await Type.findOne({where: {id: id}})
        const result = await Type.update(
            {visuable: (!type.visuable)},
            {where: {id: id}}
        )
        return res.json(result)
    }

}

module.exports = new TypeController()
