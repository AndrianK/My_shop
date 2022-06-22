import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {setDescription} from "../../http/deviceAPI";
import {Context} from "../../index";
import {useParams} from "react-router-dom";



const SetDescription = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const {id} = useParams()
    const Description = () => {
        setDescription({_id: id, text: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати опис
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть новий опис"}
                        style={{height:"auto"}}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={Description}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SetDescription;
