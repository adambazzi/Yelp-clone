import React, { useEffect } from "react";
import './BusinessMap.css'

/* global google */

function createCenterControl(myMap) {
  const newYork = { lat: 40.7128, lng: -74.0060 };
  const controlButton = document.createElement("button");

  controlButton.classList.add("buttonStyle");

  controlButton.textContent = "Center Map";
  controlButton.title = "Click to recenter the map";
  controlButton.type = "button";
  controlButton.addEventListener("click", () => {
    myMap.setCenter(newYork);
  });

  return controlButton;
}

function initMap(businesses) {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 40.7128, lng: -74.0060 },
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  });

  const bounds = new google.maps.LatLngBounds();
  const markers = [];

  const centerControlDiv = document.createElement("div");
  const centerControl = createCenterControl(map);
  centerControlDiv.appendChild(centerControl);
  map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
    centerControlDiv
  );
  let index = 1

  businesses.forEach((business) => {
    if (business && business.lat && business.lng) {
      const marker = new google.maps.Marker({
        position: { lat: Number(business.lat), lng: Number(business.lng) },
        map,
        optimized: false,
        label: {
          text: `${index}`,
          color: 'black',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Arial',
          className: 'marker-label',
          width: '100px',
          height: '30px',
          background: {
            color: 'white',
            opacity: 1
          },
          borderRadius: '50%',
          padding: '5px 8px',
          boxShadow: '0px 0px 3px #33333333',
          zIndex: '1'
        },
        icon: null,
        businessId: business.id
      });
      index++

      markers.push(marker);
      bounds.extend(marker.getPosition());

      const infowindow = new google.maps.InfoWindow({
        content: `
          <a href="/businesses/${business.id}" class="infowindow">
            <div class="infowindow-title">${business.name}</div>
            <div class="infowindow-image-container">
              <img src="${business.previewImage[0].url}" alt="Preview Image" class="infowindow-image">
            </div>
          </a>
        `,
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
        window.location.href = `/businesses/${business.id}`;
      });
      marker.addListener("mouseover", () => {
        infowindow.open(map, marker);
      });
      marker.addListener("mouseout", () => {
        infowindow.close();
      });
    }
  });

  map.fitBounds(bounds);

  markers.forEach((marker) => {
    marker.addListener("click", () => {
      window.location.href = `/businesses/${marker.businessId}`;
    });
  });
}

function BusinessesMap({ businesses }) {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    script.async = true;
    script.onload = () => {
      initMap(businesses);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [businesses]);

  window.initMap = initMap;

  return <div id="map" className="map"></div>;
}

export default BusinessesMap;
