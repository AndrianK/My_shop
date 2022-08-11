const sequelize = require('../db')
const {DataTypes} = require('sequelize')
let Lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},

})
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING,  allowNull: false},
    postcode: {type: DataTypes.STRING, allowNull: false},
    addressee: {type: DataTypes.STRING, allowNull: false},
    status:{type: DataTypes.INTEGER, defaultValue: 1}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    _info:{type: DataTypes.TEXT, defaultValue: Lorem},
    amount:{type: DataTypes.INTEGER, allowNull: false},
    country:{type: DataTypes.STRING, allowNull: false},
    visuable:{type: DataTypes.BOOLEAN, defaultValue: false},
})



const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    visuable:{type: DataTypes.BOOLEAN, defaultValue: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    visuable:{type: DataTypes.BOOLEAN, defaultValue: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const OrderDevice = sequelize.define('order_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Legal = sequelize.define('legal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  allowNull: false},
    legal_p: {type: DataTypes.STRING,  allowNull: false},
    descr: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING},
    located: {type: DataTypes.STRING,  allowNull: false},
    bill: {type: DataTypes.STRING,  allowNull: false},
    inn: {type: DataTypes.STRING, allowNull: false},
    comment: {type: DataTypes.STRING},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment: {type: DataTypes.STRING, allowNull: false},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderDevice);
OrderDevice.belongsTo(Order);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Order.hasOne(User);
User.belongsTo(Order);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);
Device.hasMany(OrderDevice);
OrderDevice.belongsTo(Device);

Legal.hasMany(Device);
Device.belongsTo(Legal);

User.hasMany(Review)
Review.belongsTo(User)

Device.hasMany(Review)
Review.belongsTo(Device)


module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    DeviceInfo,
    Order,
    OrderDevice,
    Legal,
    Review
}





