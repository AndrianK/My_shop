import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {Context} from "../index";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            {device.amount != 0 ?

            <Card style={{border: '2px solid lightgray', width: 170, height:300, cursor: 'pointer'} }className="p-2">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/><br/>
                <div style={{width: '90%', margin: '0 auto', textalign: 'center'}}>{device.name}<br/>
                    ціна: {device.price} $$$

                    Залишилось:{device.amount}
                </div>
            </Card>
         :

                <Card style={{border: '2px solid red', width: 180, height:300, cursor: 'pointer'} }className="p-2">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/><br/>
                <div style={{width: '90%', margin: '0 auto', textalign: 'center'}}>{device.name}<br/>
                    ціна: {device.price} $$$
                    Немає в наявності
                </div>
            </Card>
        }
        </Col>
    );
};

export default DeviceItem;
