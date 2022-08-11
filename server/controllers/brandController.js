const {Brand, Device} = require('../models/models')
const ApiError = require('../error/ApiError');
const { closeComplete } = require('pg-protocol/dist/messages');

class BrandController {
    async create(req, res, next) {
        try{
        const {name} = req.body
        const brand = await Brand.create({name})
        }catch (e)
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delOne(req, res) {
        const {id} = req.params
        let mess
        const devices = await Device.findAll(
            {where: {brandId: id}}
        ) 

        if(devices.length < 1 ){
            mess = await Brand.destroy(
                {where: {id: id}}
            ); mess = "Категорію видалено"
        } else mess = "Категорія містить пристрої, змініть назву або зробіть категорію скритою"
        return res.json(mess)
    } 

    async Update(req, res) {
        const {id} = req.params
        let {name} = req.body
        const result = await Brand.update(
            {name: name},
            {where: {id: id}}
        )
        return res.json(result)
    }

    async Hide(req, res) {
        const {id} = req.params
        const brand = await Brand.findOne({where: {id: id}})
        const result = await Brand.update(
            {visuable: (!brand.visuable)},
            {where: {id: id}}
        )
        console.log(brand)
        return res.json(result)
    }
}

module.exports = new BrandController()
