import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Col,Card, Form } from "react-bootstrap";
import { Context } from '..';
import { delType, hideType } from "../http/deviceAPI";
import { updateType } from "../http/deviceAPI";
const { useContext } = require("react");
const { Container } = require("react-bootstrap");

const Delete = (id) => {
    const a =  window.confirm("Видалити категорію ?");
    if(a) delType(id).then(response => alert(response)).then(data => {
    window.location.reload()
    })
}


const UpdList = observer(() => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const [value, setValue] = useState('')

    const Update = (id) => {
        updateType(id, value).then(data => {
            setValue('')
        })
    }
    
    
    return (
    <Container md={12} className="d-flex">
         
         <Col md = {6} className="flex-col">
         {device.types.map( type =>
        <Card className = "m-2 p-2 flex-row " key={type.id}>
            <div className="w-25" > {type.name}</div>
            <Button className=" m-1  bg-warning border-white flex-fill " onClick={() => {hideType(type.id)}}>Hide</Button>
            {device.selectedType.id !== type.id ? <Button className=" m-1 bg-success border-white flex-fill " onClick={() => {device.setSelectedType(type)}}>Update</Button> :
            <Form className="d-flex">
            <Form.Control
                
                onChange={e => setValue(e.target.value)}
                placeholder={"New name"}
                style={{height:"auto"}}

            />
            <Button onClick={() => {Update(type.id)}} className="m-1 flex-fill bg-success border-white">Upd</Button>
            </Form>
            } 
            <Button className=" m-1 bg-danger border-white flex-fill " onClick={() => {Delete(type.id)}}>{device.selectedType.id !== type.id ? "Delete" : "Del" }</Button>
        </Card>
        )}
        </Col>

        <Col md = {6} className="flex-col">
        {device.brands.map( brand =>
        <Card className = "m-2 p-2 flex-row " key={brand.id}>
            <div className="w-25"> {brand.name}</div>
            <Button className=" m-1  bg-warning border-white flex-fill " onClick={() => {updateType(brand.id)}}>Hide</Button>
            <Button className=" m-1 bg-success border-white flex-fill " onClick={() => {updateType(brand.id)}}>Update</Button>
            <Button className=" m-1 bg-danger border-white flex-fill " onClick={() => {Delete(brand.id)}}>Delete</Button>
        </Card>
        )}
        </Col>

    </Container>
    );
})

export default UpdList;