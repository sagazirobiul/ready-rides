import React from 'react';
import './Vehicle.css'
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Transport = ({vehicle}) => {
    const {name, image} = vehicle;
    return (
        <Col md={3} className='vehicle'>
            <Link to={`destination/${name}`}>
                <Card className='vehiclesCard'>
                    <div className='card-img'>
                        <Card.Img variant="top" src={image} />
                    </div>
                    <Card.Body className='text-center cardDetails'>
                        <h4>{name}</h4>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default Transport;