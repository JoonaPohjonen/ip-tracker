# IP Address Tracker

## Table of contents

- [Overview](#overview)
- [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

This IP Address Tracker can pinpoint any location on the map by tracking the IP address given by the user. The IP address is to be typed into the search bar and upon pressing the arrow next to it, the tracker will showcase the IP addresses exact location on the map. The map being used in this application in taken from the Leaflet API whitch provides an easily implementable map that is being rendered in the browser. There is also another API being used in this project for the purpose of getting relevant data of the location pointed out by the IP address that is being searched. This API is Geolocation API whitch gives data relevant to the IP address that is being searched. By combining these two APIs we are able to output the geographical location of the IP address to the map, as well as showcasing relevant data connected to the IP address like Company name, country and the timezone of the address. There is also a placeholder location placed inside the search field when the application is first loaded. This IP address belongs to Google and it is being displayed for the reason of outputting a prettier view when the site is loaded. If the IP address was empty so would also be the map. This also gives an easy guide to how the app works and gives an insight into what data the application showcases when IP is tracked.

For now the application is not yet mobile friendly and the scaled down version is being worked on in the near future.

## Screenshot

![Preview for the IP address tracker](./public/IP-Address-Tracker.PNG)

## My Process

### Built with

- Semantic HTML5 markup
- CSS
- JavaScript
- [React](https://reactjs.org/) - JS library

### What I learned

I chose this project because I wanted to revisit consept of using fetch requests to get data from an API. I also wanted to use react for developing this application since I figured its good to excercise the most modern practises used in the web application development at the moment.

### Continued development

As stated previously, the mobile friendly version of the app is being developed and I will release my solution for it when I get it done.

### Useful resources

- [IP Geolocation API](https://geo.ipify.org/)
- [Leaflet](https://leafletjs.com/)