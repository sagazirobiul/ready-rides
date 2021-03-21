import React from 'react';
import './DestinationInfo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarWeek} from '@fortawesome/free-solid-svg-icons'


const DestinationInfo = ({selectedVehicle, destination}) => {
    const {from, to, date} = destination;
    const {name, image, more} = selectedVehicle;
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
                    <div className='vehicleInfo d-flex justify-content-between  align-items-center'>
                        <img src={image} alt=""/>
                        <h4>{name}</h4>
                        <h4><FontAwesomeIcon icon={faUser}/> {passenger}</h4>
                        <h4>${price}</h4>
                    </div>
                )
                })
            }
        </div>
    );
};

export default DestinationInfo;