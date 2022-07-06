import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {addToBasket, delDevice, fetchOneDevice, setVisuable, updateAmount} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import SetDescription from "../components/modals/SetDescription";

const DevicePage = observer(() => {

    const {user} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    const [deviceVisible, setDeviceVisible] = useState(false)
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const [value, setValue] = useState('')

    const Amount = () => {
        updateAmount(id, value).then(response => alert(`Кількість товару оновлено`))
    }


    // ------- Функція додання у кошик ------- //
    const add = () => {
        const formData = new FormData()
        formData.append('deviceId', id)
        if(device.amount){
        addToBasket(formData).then(response => alert(`Товар ` + device.name + ` було додано у ваш кошик!`))
        } else alert("Немає в наявності")
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                    <h1>{device.name}</h1>
                </Col>
                <Col>
                    <h2>Характеристики</h2>
                    {device.info.map((info, index) =>
                        <Row key={info.id} style={{
                            border: '2px solid lightgray',
                            background: index % 2 === 0 ? 'lightgray' : 'transparent',
                            padding: 10
                        }}>
                            <Col>{info.title}</Col><Col> : {info.description}</Col>
                        </Row>
                    )}
                </Col>
            </Row><br/>
            <Row>
                <Col className={"w-75"}>
                    <label >
                        {device._info}
                    </label>
                </Col>
                <Col md={3}>
                <Card
                    className="d-flex flex-column align-items-center align-self-end p-3 "
                    style={{width: 300, fontSize: 32, border: '5px solid light'}}
                >
                    <h3>Від: {device.price} Грн.</h3>


                    <Button variant={"outline-dark"} className="bg-success text-light" onClick={add}>Додати до кошику</Button>

                </Card>
                </Col>
            </Row>
            {user.isRole === "ADMIN"?
            <Row>

                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 bg-primary text-light"
                    onClick={() => setDeviceVisible(true)}
                >
                    Додати опис
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 bg-danger text-light"
                    //onClick={() => delDevice(id).then(response => alert(`Товар було видалено!`)) }
                    onClick={() => delDevice(id).then(response => alert(response))}
                >
                    Видалити
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2 bg-secondary text-light"

                    onClick={() => setVisuable(id).then(response => alert(response))}
                >
                    Приховати/Розмістити
                </Button>
                <Row>
                    <Col>
                        <Form>
                        <Form.Control
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Введіть кількість "}
                            style={{height:"auto"}}
                            className="mt-4 w-100 p-2"
                        />
                    </Form>
                    </Col>
               <Col>
                   <Button
                       variant={"outline-dark"}
                   className="mt-4 w-100 p-2 bg-success text-light"
                   onClick={Amount}
               >
                   Оновити кількість
               </Button>
               </Col>

                </Row>
                <SetDescription show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            </Row>:<br/>
        }
        </Container>
    );
});
export default DevicePage;
