const {Brand, Device} = require('../models/models')
const ApiError = require('../error/ApiError');

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

    async Update(req, res) {
        const {_id,_name} = req.body
        const device = await Brand.update(
            {name: _name},
            {where: {id: _id}}
        )
        return res.json(device)
    }
}

module.exports = new BrandController()
