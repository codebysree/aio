'use client'

import { useState, useEffect } from "react";


export default function Weather() {

    const [imgSrc, setImgSrc] = useState('');
    const [json, setJson] = useState({});

    const GetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
    };

    const successFunction = async (position) => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        await getWeather(lat, long);
        console.log('Your latitude is :' + lat + ' and longitude is ' + long);
    }

    const errorFunction = (error) => {
        const x = document.getElementById('demo');
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }

    useEffect(() => {
        // Call your function here
        GetLocation();
    }, []);

    const getWeather = async (lat, long) => {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat + "," + long}&aqi=yes`;
        const res = await fetch(url);
        const resjson = await res.json();
        setImgSrc(resjson.current.condition.icon)
        setJson(resjson)
        console.log(resjson);
    }
    return <>
        <div className="col-lg-6 col-sm-12">
            <div className="card mt-2 shadow">
                <div className="card-header">
                    <span className="float-start">Location</span>
                    {imgSrc ? <span className="float-end">{json.location?.region + ', ' + json.location?.country}</span> : ''}
                </div>
                <div className="card-body">
                    {imgSrc ? <>
                        <div className="row">
                            <div className="col">
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                        <img src={imgSrc} alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0" />
                                        <div className="d-flex gap-2 w-100 justify-content-between">
                                            <div className="row">
                                                <h6 className="mb-0 opacity-50">{json.current.condition.text}</h6>
                                                <br></br>
                                                <br></br>
                                                <p className="mb-0 opacity-75">
                                                    <span className="badge bg-info">Temperature</span> {json.current.temp_c} &#x2103;
                                                </p>

                                                <p className="mb-0 opacity-75">
                                                    <span className="badge bg-info">Feels Like</span> {json.current.feelslike_c}  &#x2103;
                                                </p>
                                                <p className="mb-0 opacity-75">
                                                    <span className="badge bg-info">Clouds </span> {json.current.cloud} %
                                                </p>
                                                <p className="mb-0 opacity-75">
                                                    <span className="badge bg-info">humidity </span>  {json.current.humidity}
                                                </p>
                                                <p className="mb-0 opacity-75">
                                                    <span className="badge bg-info">Wind Speed </span> {json.current.wind_kph} km/hrs
                                                </p>
                                                <p className="mb-0 opacity-75">
                                                    <span className="badge bg-info">PM 2.5  </span>  {Number(json.current.air_quality.pm2_5).toFixed(2)}
                                                </p>
                                            </div>
                                            {/* <small className="opacity-50 text-nowrap">{json.temp_c} &#x2103;</small> */}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </> : ''}
                </div>
            </div>
        </div>
    </>
}



