import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, REG_ROUTE, SHOP_ROUTE, UPDLIST} from "./utils/consts";
import Basket from "./Pages/Basket";
import AdminPage from "./Pages/AdminPage";
import Shop from "./Pages/Shop";
import Auth from "./Pages/Auth";
import DevicePage from "./Pages/DevicePage";
import Order from "./Pages/Order";
import UpdList from "./Pages/UpdList";


export const authRoutes = [

  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  }
  ]

export const publicRoutes = [
{
  path: SHOP_ROUTE,
      Component: Shop
},
{
  path: LOGIN_ROUTE,
      Component: Auth
},
{
  path: REG_ROUTE,
      Component: Auth
},
{
  path: DEVICE_ROUTE + '/:id',
      Component: DevicePage
},
{
  path: ORDER_ROUTE,
  Component: Order
},
{
  path: UPDLIST,
  Component: UpdList
}
]