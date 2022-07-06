import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createBrand, updateType} from "../../http/deviceAPI";

const CreateBrand = ({show, onHide, location}) => {
    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({name: value}).then(data => {
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
                    Додати бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть назву бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                {location === "ADD" && <Button variant="outline-success" onClick={addBrand}>Додати</Button>}
                {location === "UPD" && <Button variant="outline-success" onClick={updateType}>Оновити</Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
