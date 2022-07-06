import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

import {Button} from "react-bootstrap";
import {delType} from "../http/deviceAPI";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Delete = (id) => {
    const a =  window.confirm("Видалити категорію");
    if(a) delType(id).then(response => alert(response)).then(data => {
    window.location.reload()
    })
}

const TypeBar = observer(() => {
    const {device, user} = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id ? true: undefined}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                    className={type.id === 6 && "border-warning border-3"}
                >
                    <Row className="d-inline">
                        <Col className="d-inline-block w-50">{type.name}</Col>
                        <Col className=" d-inline" >
                            {user.isRole === "ADMIN" && <Button className="ms-auto w-50 bg-warning border-white" onClick={() => {Delete(type.id)}}>Hide</Button>}
                        </Col>
                    </Row>

                    {user.isRole === "ADMIN" &&
                        <Row className="d-inline">
                            <Button className=" m-1 w-50  bg-success border-white" onClick={() => {Delete(type.id)}}>Update</Button>
                            <Button className=" m-1 w-50  bg-danger border-white" onClick={() => {Delete(type.id)}}>Delete</Button>
                        </Row>
                    }
                </ListGroup.Item>

            )}
        </ListGroup>

    );
});

export default TypeBar;
