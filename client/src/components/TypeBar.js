import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
                    </Row>

                </ListGroup.Item>

            )}
        </ListGroup>

    );
});

export default TypeBar;
