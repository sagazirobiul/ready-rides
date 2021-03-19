import React from 'react';
import './DestinationInfo.css'

const DestinationInfo = ({selectedVehicle, destination}) => {
    const {from, to} = destination;
    const {name, image, more} = selectedVehicle;
    return (
        <div>
            <div>
                <h3>{from}</h3>
                <h4>To</h4>
                <h3>{to}</h3>
            </div>
            {
                more.map(({passenger, price}) => {
                    return (
                    <div className='vehicleInfo d-flex'>
                        <img src={image} alt=""/>
                        <h4>{name}</h4>
                        <h4>{passenger}</h4>
                        <h4>${price}</h4>
                    </div>
                )
                })
            }
        </div>
    );
};

export default DestinationInfo;