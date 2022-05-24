import React, { useEffect, useState } from "react";
import "./App.css";
import iconArrow from './images/icon-arrow.svg';
import iconLocation from './images/icon-location.svg';
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const [ip, setIp] = useState("8.8.8.8");
  const [adressData, setAdressData] = useState({                                  //Placeholderina googlen ip ja tiedot. muuten sivusto kaatuu kun yritetään lukea syötekentän tietoja joita ei ole vielä.
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "California",
        "city": "Mountain View",
        "lat": 37.38605,
        "lng": -122.08385,
        "postalCode": "94035",
        "timezone": "-07:00",
        "geonameId": 5375480
    },
    "domains": [
        "000000-1v1v1v1v1v1v118888888.sdqpwlbock-gkynimr.tokyo",
        "000000-1v1v1v1v1v1v118888888.vqgnghfanh-qwkjxdkw.tokyo",
        "000000000-00000000-00000x00x00.avtjjdduxprylg.tokyo",
        "000000000-00000000-00000x00x00.besnwgjsyl-opygosu.top",
        "000000000-00000000-00000x00x00.cpbsvcmdybtazu.top"
    ],
    "as": {
        "asn": 15169,
        "name": "GOOGLE",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC",
    "proxy": {
        "proxy": false,
        "vpn": false,
        "tor": false
    }
});

  let apiKey = process.env.REACT_APP_API_KEY;                                           //API key is taken from the untracked .env file for safety
  const api = "https://geo.ipify.org/api/v1?apiKey="+apiKey+"&ipAddress="               //Geo API ilman IP osoitetta

  let gibeLocation = () => {
    fetch(
      api + ip                                                                                                //Yhdistetään API osoite ja IP osoite
    )
      .then((res) => res.json())                                                                              //Data jsoniksi
      .then((data) => setAdressData(data));                                                                   //Data asetetaan stateen tyhjän objektin tilalle
  };

  useEffect(() => {
    //Run when component loads
    let map = window.L.map("map").setView([adressData.location.lat, adressData.location.lng], 13);            //window.L eikä pelkkä L koska ompas tyhmää

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let myIcon = window.L.icon({
      iconUrl: iconLocation,
      iconSize: [38, 47],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    })

    window.L.marker([adressData.location.lat, adressData.location.lng], {icon: myIcon})
      .addTo(map)
      .bindPopup("Here is the searched location")
      .openPopup();

      console.log(ip)
      console.log(adressData)

    return () => {
      //when component unmounts
      map.remove();
    };
  }); // [] = means useEffect will only run once, at page load

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>IP address tracker</title>
        </Helmet>
      </HelmetProvider>
      <div id="upperHalf">
        <h1>IP Address Tracker</h1>
        <div id="search">
          <input placeholder="IP here" value={ip} onChange={(e) => setIp(e.target.value)} type="text"></input>
          <button onClick={gibeLocation}>
            <img id="arrow" src={iconArrow} alt="arrow icon"/>
          </button>
        </div>
        <div id="osoitetiedot">
          <div id="ipInfoDivLeft">
            <p className="infoOtsikko">IP ADDRESS</p>
            <p className="infoSisalto">{adressData.ip}</p>
          </div>
          <div className="ipInfoDivMid">
            <p className="infoOtsikko">LOCATION</p>
            <p className="infoSisalto">{adressData.location.city}</p>
            <p className="infoSisalto">{adressData.location.region} {adressData.location.postalCode}</p>
          </div>
          <div className="ipInfoDivMid">
            <p className="infoOtsikko">TIMEZONE</p>
            <p className="infoSisalto">{adressData.location.timezone}</p>
          </div>
          <div id="ipInfoDivRight">
            <p className="infoOtsikko">ISP</p>
            <p className="infoSisalto">{adressData.isp}</p>
          </div>
        </div>
      </div>
      <div id="map" style={{ height: "65vh" }}></div>
    </>
  );
}

export default App;
