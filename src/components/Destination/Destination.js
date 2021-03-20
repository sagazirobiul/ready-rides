import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import fakeData from '../../Data/fakeData.json'
import DestinationInfo from '../DestinationInfo/DestinationInfo';
import './Destination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Map from '../../image/Map.png'

const Destination = () => {
    const {name} = useParams();
    const selectedVehicle = fakeData.find(vehicle => vehicle.name === name)
    const [destination, setDestination] = useState({from:'', to:''});
    const [isSubmitted, setSubmitted] = useState(false)
    const handleOnBlur = (event) => {
        const {name, value} = event.target;
        const destinationInfo = {...destination};
        destinationInfo[name] = value;
        setDestination(destinationInfo);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(name){
            setSubmitted(true)
        }
    }
    return (
        <Container>
            <Row>
                <Col md={4}>
                    {name === undefined && <p className='text-center text-warning'>Please! go to the home page and choose your vehicle :)</p>}
                    { isSubmitted ?
                    <DestinationInfo selectedVehicle={selectedVehicle} destination={destination}/> : 
                    <div className="searchForm">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-center"><FontAwesomeIcon icon={faSearch}/> Search for Ride</h3>
                            <input type="text" onBlur={handleOnBlur} name="from" placeholder='Enter pickup location' required/>
                            <input type="text" onBlur={handleOnBlur} name="to" placeholder='Enter destination' required/>
                            <label for="date" className="departure">Departure :</label>
                            <input type="date" onBlur={handleOnBlur} id="date" name="date" className='date' required/>
                            <input type="submit" value='Search' className="submitBtn"/>
                        </form>
                    </div>}
                </Col>
                <Col md={8}>
                    <img style={{width: '100%'}} src={Map} alt=""/>
                </Col>    
            </Row>
        </Container>
    );
};

export default Destination;