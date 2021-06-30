import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import fakeData from '../../Data/fakeData.json'
import Vehicle from '../Vehicle/Vehicle';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield } from '@fortawesome/free-solid-svg-icons'
import spinner from '../../image/simplespinner.gif'

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => setVehicles(fakeData), [])
    return (
        <Container>
            <h1 className='text-center my-5 companyName'><span className='highlight'><FontAwesomeIcon icon={faUserShield} /></span> Focused on <span className='highlight'>safety</span>, wherever you Go</h1>
            { vehicles.length === 0 &&
                <div className="d-flex justify-content-center spinner">
                    <img src={spinner} alt="" />
                </div>
            }
            <Row>
                {
                    vehicles.map(vehicle => <Vehicle key={vehicle.key} vehicle={vehicle}/>)
                }
            </Row>
        </Container>
    );
};

export default Home;