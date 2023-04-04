import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './BusinessMap.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

export default function BusinessesMap({ businesses }) {
  const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

 useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
      });
    });

  useEffect(() => {
    // add markers for each business
    if (map.current) {
      const markers = businesses.map((business) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([business.lng, business.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>${business.name}</p>`))
          .addTo(map.current);
        return marker;
      });

      // fit map to markers
      if (markers.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        markers.forEach((marker) => {
          bounds.extend(marker.getLngLat());
        });
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15,
        });
      }
    }
  }, [businesses]);

  return (
      <div className="map-container-wrapper">
        <div ref={mapContainer} className="map-container" />
      </div>
        );
}
