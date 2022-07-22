import {$authHost, $host} from "./index";


 const Visuable = async (role, arr) =>
{
    let newArr = [];
    for (let i = 0; i < arr.length; i++) 
    if (arr[i].visuable === true) 
    newArr.push(arr[i]);
    return newArr
}

// ------ Тип ------- //
export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async (role) => {
    const {data} = await $host.get('api/type')
    let newData 
    if(role === 'USER') newData = Visuable(role, data) 
    return newData? newData: data
}

export const delType = async (id) => {
    const {data} = await $authHost.post('api/type/del/'+ id)
    return data
}


export const hideType = async (id) => {
    const {data} = await $authHost.post('api/type/hide/'+ id)
    return data
}

export const updateType = async (id, name) => {
    const {data} = await $authHost.post('api/type/upd/'+ id, {name})
    return data
}

// ------ Бренды ------- //
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async (role) => {
    const {data} = await $host.get('api/brand', )
    let newData 
    if(role === 'USER') newData = Visuable(role, data) 
    return newData? newData: data
}

export const delBrand = async (id) => {
    const {data} = await $authHost.post('api/brand/del/'+ id)
    return data
}


export const hideBrand = async (id) => {
    const {data} = await $authHost.post('api/brand/hide/'+ id)
    return data
}

export const updateBrand = async (id, name) => {
    const {data} = await $authHost.post('api/brand/upd/'+ id, {name})
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
