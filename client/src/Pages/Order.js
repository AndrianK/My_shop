import React, {useEffect, useRef} from 'react';
import { useContext, useState } from 'react';
import { Context } from '../';
import {fetchBrands, fetchLegal, fetchTypes, getOrder, getUserOrderList} from '../http/deviceAPI';
import {Button, Card, Col, Container, Dropdown, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import CreateOrder from "../components/modals/CreateOrder";

const Basket = observer(() => {
    const {device,user, a} = useContext(Context)
    const [orderVisible, setOrderVisible] = useState(false)
    const myRef = useRef(null)
    useEffect(() => {
        getOrder(user.isUser).then(data => device.setOrders(data))
        getUserOrderList(device._selectedOrder).then(data => device.setOrdersList(data))
    }, [device,device._selectedOrder, a])

    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

    let prices = 0;
    {device._orders_lists.map(price =>
        prices += price.device.price
    )}
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Засмовлення</h1>

            {/* ------- Считаем общую сумму ------- */}




            <Row> <Button variant={"outline-dark"} onClick={() => setOrderVisible(true)}>Отправить заказ</Button> </Row>

            <h1 className="pt-5 pb-2">Усі замовлення</h1>


            {device.order.map(product =>


                <Card className="d-flex w-100 pb-3  m-3">
                    <Row d-flex>
                        <Row className="row pb-1 m-3 ">

                            <Col className={"mt-3"}>Addressee</Col>
                            <Col className={"mt-3"}>Postcode</Col>
                            <Col className={"mt-3"}>Status</Col>
                        </Row>
                        <Row className="row pb-1 m-3 ">
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
{/*                                <Dropdown className="mt-2 mb-2">
                                    <Dropdown.Toggle>{device.status || "Оберіть статус"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {device.order.map(order =>
                                            <Dropdown.Item
                                                key={order.id}
                                            >
                                                {{
                                                    '0': <h3> Closed</h3>,
                                                    '1': <h3> Stay</h3>,
                                                    '2': <h3> Go</h3>,
                                                    '3': <h3> Complete</h3>
                                                }[order.status]}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>*/}
                            </Col>
                        </Row>

                    </Row>
                    {product.id == device.selectedOrder &&
                            device.selectedOrder &&
                                <Row className="  row pb-1 m-3">
                                    <Col className={"mt-3"}>id</Col>
                                    <Col className={"mt-3"}>Name</Col>
                                    <Col className={"mt-3"}>Price</Col>
                                </Row>
                            }
                    {product.id == device.selectedOrder &&
                    device._orders_lists.map
                    (product =>

                        <Card className="  p-2 row m-3  ">
                            <Row className="row">
                                <Col className={"mt-3"}>{product.device.id}</Col>
                                <Col className={"mt-3"}>{product.device.name}</Col>
                                <Col className={"mt-3"}>{product.device.price}</Col>
                            </Row>
                        </Card>
                    )}
                    {product.id == device.selectedOrder &&
                    <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-1 m-3">
                        <h1 className="align-self-end" >Усього:</h1>
                        <h3  className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> $$$ </span></h3>
                    </Card>}
                </Card>
            )}

        </Container>
    );

});

export default Basket;
