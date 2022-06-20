import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '../';
import {addToBasket, deleteFromBasket, getBasket, getUserOrder, getUserOrderList} from '../http/deviceAPI';
import {Button, Card, Col, Container, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import CreateOrder from "../components/modals/CreateOrder";
import {useNavigate} from "react-router-dom";


const Basket = observer(() => {
    const {device,user, a} = useContext(Context)
    const [orderVisible, setOrderVisible] = useState(false)
    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
        getUserOrder(user.isUser).then(data => device.setOrders(data))
        getUserOrderList(device._selectedOrder).then(data => device.setOrdersList(data))
    }, [device,device._selectedOrder, a])

    const _delete = (id) => {
        deleteFromBasket(id).then(response => alert(`Товар удален из корзины`));
        a._reload=a+1;
    }

    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

    let prices = 0;
    {device.basket.map(price =>
        prices += price.device.price
    )}
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина</h1>

            {/* ------- Считаем общую сумму ------- */}

            <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
                <h1 className="align-self-end" >Итого:</h1>
                <h3  className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> $$$ </span></h3>
            </Card>
            {device.basket.map(product =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2"  key={product.id}>

                        <Row>
                            <Col md="2" className="d-inline-flex flex-row">
                            <div className="flex-row" >
                                <img src={process.env.REACT_APP_API_URL + product.device.img} alt="img not found" height={100}  />
                            </div>
                            </Col>
                            <Col  className="d-flex flex-row">
                            <div className="flex-row">
                                <h1 className="ms-3">{product.device.name}</h1>
                            </div>
                            </Col>
                                <Col  className="d-flex flex-row justify-content-end">
                            <div className="flex-row">
                                <h2 className="font-weight-light">{product.device.price} $$$ </h2>
                            </div>
                                </Col>
                            <Col  className="d-flex flex-row justify-content-end">
                                <div className="flex-row">
                                    <Button onClick={() => _delete(product.id)}> Delete </Button>
                                </div>
                            </Col>
                        </Row>
                </Card>
            )}

            <Row> <Button variant={"outline-dark"} onClick={() => setOrderVisible(true)}>Отправить заказ</Button> </Row>

            <h1 className="pt-5 pb-2">Предыдущие заказы</h1>

            <Row className=" w-100 row pb-1">
                <Col className={"mt-3"}>Addressee</Col>
                <Col className={"mt-3"}>Postcode</Col>
                <Col className={"mt-3"}>Status</Col>
            </Row>
            {device.order.map(product =>

                <Card className="d-flex w-100 pb-3">
                    <Row d-flex>
                        <Col><h3>{product.addressee}</h3></Col>
                        <Col><h3>{product.postcode}</h3></Col>
                        <Col>
                            {{
                                '0': <h3> Closed</h3>,
                                '1': <h3> Stay</h3>,
                                '2': <h3> Go</h3>,
                                '3': <h3> Complete</h3>
                            }[product.status]}
                            <Button className="w-75 align-self-center ms" onClick={() => device.setSelectedOrder(product.id)}> Open </Button>
                        </Col>

                    </Row>

                </Card>
            )}
            <Row className=" w-100 row pb-1">
                <Col className={"mt-3"}>id</Col>
                <Col className={"mt-3"}>Name</Col>
                <Col className={"mt-3"}>Price</Col>
            </Row>

            {device._orders_lists.map
                (product =>
                    <Col className=" w-100">

                        <Card className=" w-100 row">
                            <Row className="row">
                                <Col className={"mt-3"}>{product.device.id}</Col>
                                <Col className={"mt-3"}>{product.device.name}</Col>
                                <Col className={"mt-3"}>{product.device.price}</Col>
                            </Row>
                        </Card>
                    </Col>
                )}
            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
        </Container>
    );

});

export default Basket;
