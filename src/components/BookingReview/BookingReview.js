import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './BookingReview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarWeek, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, Button } from 'react-bootstrap';

const BookingReview = () => {
    const getUserInfo = useContext(UserContext)
    const bookingInfo = getUserInfo[4]
    const setBookingInfo = getUserInfo[5]
    const handleCancelBooking = (currIndex) => {
        const updateBooking = bookingInfo.filter((element, index) => {
            return index !== currIndex;
        })
        setBookingInfo(updateBooking)
    }
    let totalPrice = 0;
    let totalPassenger = 0;
    for (let i = 0; i < bookingInfo.length; i++) {
        const element = bookingInfo[i];
        totalPrice = element.price + totalPrice;
        totalPassenger = element.passenger + totalPassenger;
    }
    return (
        <Container>
            { bookingInfo.length === 0 ? <h2 className="bookingAlert text-info">There is not booked yet!</h2> :
            <Row>
                <h2 className="bookingTitle text-center col-12">Booking Summary</h2>
                <Col md={8}>
                    {
                        bookingInfo.map(({form,to,date,name,image,passenger,price}, index) => {
                            return(
                                <div md={8} className="reviewCard d-flex justify-content-between  align-items-center">
                                    <img src={image} alt=""/>
                                    <p>{name}</p>
                                    <p>{form} To {to}</p>
                                    <p><FontAwesomeIcon icon={faCalendarWeek}/> {date}</p>
                                    <p><FontAwesomeIcon icon={faUser}/> {passenger}</p>
                                    <p>price: ${price}</p>
                                    <Button className="btn btn-danger ml-2" onClick={() => handleCancelBooking(index)}>Cancel Booking</Button>
                                </div>
                            )
                        })
                    }
                </Col>
                <Col md={4}>
                    <div className="calculateAll">
                        <h3 className="calculateTitle text-center">Calculate All</h3>
                        <p><FontAwesomeIcon icon={faBookmark}/> Total Booking: {bookingInfo.length}</p>
                        <p><FontAwesomeIcon icon={faUser}/> Total Passenger: {totalPassenger}</p>
                        <p>$ Total Price: {totalPrice}</p>
                    </div>
                </Col>
            </Row>}
        </Container>
    );
};

export default BookingReview;