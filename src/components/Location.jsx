import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Location = () => {

    const [ location, setLocation ] = useState({});
    const [ temp, setTemp ] = useState(0);
    const [ isFarhenheit, setIsFarhenheit ] = useState(true);

    const success = pos => {

        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2d61f8507cec73828e0face996c412b7`)
        .then(res => {
            setLocation(res.data)
            setTemp(res.data.main.temp -273.15)
        });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
        }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const Temp = () => {

        if (isFarhenheit){
            setTemp((temp * 1.8) + 32)
            setIsFarhenheit(false);
        } else {
            setTemp((temp - 32) * 5 / 9)
            setIsFarhenheit(true);
        }

    }
    
    return (

        <div className='location'>
            <h1>Wheather App</h1>
        <h3>{location.name}, {location.sys?.country}</h3>
            <div className='info'>
                <img src={`http://openweathermap.org/img/wn/${location.weather?.[0].icon}@2x.png`} alt=''/>
                <div className='info-2'>
                    <h3>Temp: { Math.floor(temp).toFixed(1) } ° {isFarhenheit ? "C" : "F"} </h3>
                    <h3>Pressure: {location.main?.pressure} mb</h3>
                    <h3>Wind Speed: {location.wind?.speed} Km/h</h3>
                </div>
            </div>
            <button onClick={Temp}>
                Convert to {isFarhenheit ? "Farhenheit" : "Celsius"}
            </button>
        </div>
    );
};

export default Location;