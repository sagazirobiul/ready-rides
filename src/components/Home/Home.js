import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import fakeData from '../../Data/fakeData.json'
import Vehicle from '../Vehicle/Vehicle';


const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => setVehicles(fakeData), [])
    return (
        <Container>
            <h1>Ready Rides</h1>
            <Row>
                {
                    vehicles.map(vehicle => <Vehicle key={vehicle.key} vehicle={vehicle}/>)
                }
            </Row>
        </Container>
    );
};

export default Home;