import React, { useContext, useState } from 'react';
import './DestinationInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarWeek} from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App';


const DestinationInfo = ({selectedVehicle, destination}) => {
    const {from, to, date} = destination;
    const {name, image, more} = selectedVehicle;
    const getUserInfo = useContext(UserContext)
    const setBooking = getUserInfo[3]
    const setBookingInfo = getUserInfo[5]
    const [show, setShow] = useState(false);
    const handleBooking = (passenger, price) => {
        const newBookingInfo = {
            form: from,
            to: to,
            date: date,
            name: name,
            image: image,
            passenger: passenger,
            price: price
        }
        setBooking(newBookingInfo)
        setBookingInfo(previousInfo => [...previousInfo, newBookingInfo])
    }
    const tempAlert = () => {
        const element = document.createElement("div");
        element.className = 'alert'
        element.innerHTML = "Booked successfully!";
        setTimeout(() => {
        element.parentNode.removeChild(element);
        },1000);
        document.body.appendChild(element);
    }
    return (
        <div>
            <p className='vehicleInfo'><FontAwesomeIcon icon={faCalendarWeek}/> Date: {date}</p>
            <div className="timeline">
                <div className="timeline-area">
                    <div className="timeline-content">
                        <h2>{from}</h2>
                    </div>
                    <div className="timeline-content timeline-content2">
                        <h2>{to}</h2>
                    </div>
                </div>
            </div>
            {
                more.map(({passenger, price}) => {
                    return (
                    <div onClick={() => {handleBooking(passenger, price); setShow(true)}} className='vehicleInfo d-flex justify-content-between  align-items-center'>
                        <img src={image} alt=""/>
                        <h4>{name}</h4>
                        <h4><FontAwesomeIcon icon={faUser}/> {passenger}</h4>
                        <h4>${price}</h4>
                        { show && tempAlert() }
                    </div>
                )
                })
            }
        </div>
    );
};

export default DestinationInfo;