import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {addOrder, addToBasket} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateOrder = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const [phone, setPhone] = useState('')
    const [postcode, setPostcode] = useState('')
    const [addressee, setAddressee] = useState('')
    const id = user.isUser;


    const createOrder = () => {
        const formData = new FormData()
        try{
            addOrder(id, phone, postcode, addressee).then(data => onHide())
            window.location.reload()
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
                    Заповнити запит
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть номер телефону"
                    />
                    <Form.Control
                        value={postcode}
                        onChange={e => setPostcode(e.target.value)}
                        className="mt-3"
                        placeholder="Введіть адресу діставки"
                    />
                    <Form.Control
                        value={addressee}
                        onChange={e => setAddressee(e.target.value)}
                        className="mt-3"
                        placeholder="Введите ФИО отримувача"
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={createOrder}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateOrder;
