import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import data from "bootstrap/js/src/dom/data";

const Shop = observer(() => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes(user.isRole).then(data => device.setTypes(data))
        fetchBrands(user.isRole).then(data => device.setBrands(data))
        fetchDevices(null, null, device.page, device.limit, user.isRole == "ADMIN").then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, user.isRole == "ADMIN").then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList />
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );

});

export default Shop;
