import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Col,Card, Form } from "react-bootstrap";
import { Context } from '..';
import { delType, hideType, delBrand, hideBrand } from "../http/deviceAPI";
import { updateType, updateBrand } from "../http/deviceAPI";
const { useContext } = require("react");
const { Container } = require("react-bootstrap");

const DeleteT = (id) => {
    const a =  window.confirm("Видалити категорію ?");
    if(a) delType(id).then(response => alert(response)).then(data => {
    window.location.reload()
    })
}

const DeleteB = (id) => {
    const a =  window.confirm("Видалити категорію ?");
    if(a) delBrand(id).then(response => alert(response)).then(data => {
    window.location.reload()
    })
}


const UpdList = observer(() => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const [value, setValue] = useState('')

    const UpdateT = (id) => {
        updateType(id, value).then(data => {
            setValue('')
        })
    }

    const UpdateB = (id) => {
        console.log(value)
        updateBrand(id, value).then(data => {
            setValue('')
        })
    }
    
    const style = " m-1 border-white flex-fill"
    const warn = "bg-warning" 
    const succ = "bg-success"
    const dng = "bg-danger" 


    
    return (
    <Container md={12} className="d-flex">
         
         <Col md = {6} className="flex-col">
         {device.types.map( type => 
        <Card className = "m-2 p-2 flex-row " key={type.id}>
            <div className="w-25" > {type.name}</div>
            <Button className = {warn+style} onClick={() => {hideType(type.id)}}>Hide</Button>
            {device.selectedType.id !== type.id ? <Button className={succ+style} onClick={() => {device.setSelectedType(type)}}>Update</Button> :
            <Form className="d-flex">
            <Form.Control
                
                onChange={e => setValue(e.target.value)}
                placeholder={"New name"}
                style={{height:"auto"}}

            />
            <Button onClick={() => {UpdateT(type.id)}} className={succ+style}>Upd</Button>
            </Form>
            } 
            <Button className={dng+style} onClick={() => {DeleteT(type.id)}}>{device.selectedType.id !== type.id ? "Delete" : "Del" }</Button>
        </Card>
        )}
        </Col>

        <Col md = {6} className="flex-col">
         {device.brands.map( brand =>
        <Card className = "m-2 p-2 flex-row " key={brand.id}>
            <div className="w-25" > {brand.name}</div>
            <Button className={warn+style} onClick={() => {hideBrand(brand.id)}}>Hide</Button>
            {device.selectedBrand.id !== brand.id ? <Button className={succ+style} onClick={() => {device.setSelectedBrand(brand)}}>Update</Button> :
            <Form className="d-flex">
            <Form.Control
                
                onChange={e => setValue(e.target.value)}
                placeholder={"New name"}
                style={{height:"auto"}}

            />
            <Button onClick={() => {UpdateB(brand.id)}} className={succ+style}>Upd</Button>
            </Form>
            } 
            <Button className={dng+style} onClick={() => {DeleteB(brand.id)}}>{device.selectedType.id !== brand.id ? "Delete" : "Del" }</Button>
        </Card>
        )}
        </Col>

    </Container>
    );
})

export default UpdList;