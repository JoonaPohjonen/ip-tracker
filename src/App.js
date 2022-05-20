import React, { useEffect, useState } from "react";

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

  const api = "https://geo.ipify.org/api/v1?apiKey=at_MFlNbCjuwbS2vqK9o83w1H5UKlhVu&ipAddress="               //Geo API ilman IP osoitetta

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

    window.L.marker([adressData.location.lat, adressData.location.lng])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
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
      <div>
        <h1>IP Address Tracker</h1>
        <div>
          <input placeholder="IP here" value={ip} onChange={(e) => setIp(e.target.value)} type="text"></input>
          <button onClick={gibeLocation}>nuoli</button>
        </div>
        <div>Osoitetiedot</div>
      </div>
      <div>Kartta</div>
      <div id="map" style={{ height: "380px" }}></div>
    </>
  );
}

export default App;
