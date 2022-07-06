import {$authHost, $host} from "./index";

// ------ Тип ------- //
export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const delType = async (id) => {
    const {data} = await $authHost.post('api/Type/del/'+ id)
    return data
}

// ------ Бренды ------- //
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const updateType = async (_id, _name) => {
    const {data} = await $authHost.post('api/device/update', _id, _name)
    return data
}


// ------ Фірми ------- //
export const fetchLegal = async () => {
    const {data} = await $host.get('api/legal', )
    return data
}

export const createLegal = async (legal) => {
    const {data} = await $host.post('api/legal/new', legal)
    return data
}

// ------ Устройство ------- //
export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const delDevice = async (id) => {
    const {data} = await $authHost.post('api/device/del/'+ id)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit, role) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit, role
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device' + '/'+id)
    return data
}

export const setVisuable = async (id) => {
    const {data} = await $authHost.post('api/device/visuable/'+ id)
    return data
}

export const setDescription = async (_id, text) => {
    const {data} = await $authHost.post('api/device/update', _id, text)
    return data
}

export const updateAmount = async (_id, _amount) => {
    const {data} = await $authHost.post('api/device/update/'+_id, {_id, _amount})
    return data
}

// ------ Кошик ------- //

export const addToBasket = async (deviceId) => {
    const {response} = await $authHost.post('api/basket', deviceId)
    return response
}

export const deleteFromBasket = async (id) => {
    const {response} = await $authHost.post('api/basket/delete', {id:id})
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

// ------ Заказы ------- //
export const addOrder = async (id, phone, postcode, addressee) => {
    const {data} = await $host.post('api/order', {
            id, phone, postcode, addressee
        })
    return data
}

export const getOrder = async (id) => {
    const {data} = await $authHost.get('api/order/')
    return data
}

export const getUserOrder = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/user/'+id, id)
    return data
}

export const getUserOrderList = async (id) => {
    if(!id)id = 0;
    const {data} = await $authHost.get('api/order/'+id, id)
    return data
}

export const updateUserOrder = async (id, status) => {
    if(!id)id = 0;
    const {data} = await $authHost.post('api/order/update/'+id, {params:{id, status}})
    return data
}

