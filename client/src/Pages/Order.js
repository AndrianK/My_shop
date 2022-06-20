import React, {useEffect} from 'react';
import {useContext, useState} from 'react';
import {Context} from '../index';
import {getUserOrderList, getUserOrder, getBasket} from '../http/deviceAPI';
import {Button, Card, Col, Container, Row} from 'react-bootstrap'
import {observer} from 'mobx-react-lite';


import {DEVICE_ROUTE} from "../utils/consts";

import {useNavigate} from "react-router-dom";


const Orders = observer(() => {
    const {device, user} = useContext(Context)
    useEffect(() => {
        getUserOrderList(device.setOrdersList).then(data => device.setOrderList(data))

    }, [])


    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

    let prices = 0;
    {
        device.order.map(price =>
            prices += price.device.price
        )
    }
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            {device.order.map(product =>
                    <Row>

                        <Col><h3>{product.postcode}</h3></Col>
                        <Col>
                            {{
                                '0': <h3> Відхилено</h3>,
                                '1': <h3> Чекає затвердженя</h3>,
                                '2': <h3> Відправлено</h3>,
                                '3': <h3> Доставлено</h3>
                            }[product.status]}
                        </Col>
                        <Col>
                            <Button variant={"outline-dark"} onClick={() => {
                                device.setSelectedOrder(product.id)
                            }}>Открыть</Button>
                        </Col>
                    </Row>)}
            {device.order.map(product =>
                <Row md={3} className={"mt-3"} onClick={() => useNavigate(DEVICE_ROUTE + '/' + product.device.id)}>
                    <Card style={{border: '1px solid lightgray', width: 160, cursor: 'pointer'}}>
                            <Col md="2" className="d-inline-flex flex-row">
                                <div className="flex-row">
                                    <img src={process.env.REACT_APP_API_URL + product.device.img}
                                         alt="img not found" height={100}/>
                                </div>
                            </Col>
                            <Col className="d-flex flex-row">
                                <div className="flex-row">
                                    <h1 className="ms-3">{product.device.name}</h1>
                                </div>
                            </Col>
                            <Col className="d-flex flex-row justify-content-end">
                                <div className="flex-row">
                                    <h2 className="font-weight-light">{product.device.price} Гривен</h2>
                                </div>
                            </Col>
                    </Card>
                </Row>)}
            )}
        </Container>)
})

export default Orders;
