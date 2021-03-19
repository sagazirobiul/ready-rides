import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import fakeData from '../../Data/fakeData.json'
import DestinationInfo from '../DestinationInfo/DestinationInfo';

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
        if(name === undefined){
            alert('Please go to the home page and choose your vehicle :)')
        }
        else{
            event.preventDefault();
            setSubmitted(true)
        }
    }
    return (
        <Container>
            <Row>
                <Col md={4}>
                    { isSubmitted ?
                    <DestinationInfo selectedVehicle={selectedVehicle} destination={destination}/> : 
                    <form onSubmit={handleSubmit}>
                        <label for="from">Pick From</label>
                        <br/>
                        <input type="text" onBlur={handleOnBlur} name="from" id="from" required/>
                        <br/>
                        <label for="to">Pick To</label>
                        <br/>
                        <input type="text" onBlur={handleOnBlur} name="to" id="to" required/>
                        <br/>
                        <input type="submit" value='Search'/>
                    </form>}
                </Col>
                <Col md={8}>
                    <img style={{width: '100%'}} src="https://www.thestatesman.com/wp-content/uploads/2020/04/googl_ED.jpg" alt=""/>
                </Col>    
            </Row>
        </Container>
    );
};

export default Destination;