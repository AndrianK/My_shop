import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";

import {createLegal} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateLegal = observer(({show, onHide}) => {
     const [_name, setName] = useState('')
     const [type, setType] = useState('')
     const [legal_p, setLegalP] = useState('')
     const [descr, setDescr] = useState('')
     const [_phone, setPhone] = useState('')
     const [located, setLocated] = useState('')
     const [bill, setBill] = useState('')
     const [inn, setInn] = useState('')
     const [comment, setComment] = useState('')



     const addLegal = () => {
        const formData = new FormData()
        try{
            formData.append('name', _name)
            formData.append('legal_p', legal_p)
            formData.append('descr', descr)
            formData.append('type', type)
            formData.append('phone', _phone)
            formData.append('located', located)
            formData.append('bill', bill)
            formData.append('inn', inn)
            formData.append('comment', comment)
            createLegal(formData).then(data => onHide())
        } catch(e){
            alert(e)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати виробника
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={_name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введіте назву компанії"
                    />
                    <Form.Control
                        value={legal_p}
                        onChange={e => setLegalP(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть юридичну особу"

                    />
                    <Form.Control
                        value={descr}
                        onChange={e => setDescr(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть опис"

                    />
                    <Form.Control
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть тип "

                    />
                    <Form.Control
                        value={_phone}
                        onChange={e => setPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть телефон"

                    />
                    <Form.Control
                    value={located}
                    onChange={e => setLocated(e.target.value)}
                    className="mt-3"
                    placeholder="Введіть адресу"

                />
                    <Form.Control
                        value={bill}
                        onChange={e => setBill(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть розрахунковий рахунок"

                    />
                    <Form.Control
                        value={inn}
                        onChange={e => setInn(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть ИНН"

                    />
                    <Form.Control
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть коментар"

                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addLegal}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateLegal;
