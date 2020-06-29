import React, { useEffect, useRef } from "react";
import L from "leaflet";

const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ({ markerPosition, radius, id, width, height, zoom }) => {
  // create map
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    mapRef.current = L.map(id, {
      center: [markerPosition.lat, markerPosition.lng],
      zoom: zoom,
      layers: [
        L.tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${REACT_APP_MAPBOX_TOKEN}`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            accessToken: REACT_APP_MAPBOX_TOKEN,
          }
        ),
      ],
    });
  }, []);

  //   add marker
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(markerPosition);
    } else {
      markerRef.current = L.circle([markerPosition.lat, markerPosition.lng], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: radius,
      }).addTo(mapRef.current!);
    }
  }, [markerPosition]);

  return <div id={id} style={{ width: width, height: height }} />;
};

export default Map;
