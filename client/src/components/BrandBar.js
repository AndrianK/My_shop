import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {

    const {device} = useContext(Context)

    return (
        <Row className="d-flex m-lg-1" >
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer', width: 'min-content'}}
                    key={brand.id}
                    //active={brand.id === device.selectedBrand.id ? "true": undefined} not work
                    className="p-3 me-lg-4"
                    onClick={() => device.setSelectedBrand(brand)}
                    bg={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                    text={brand.id === device.selectedBrand.id ? 'light' : 'black'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
