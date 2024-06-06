import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import MapContext from "./MapContext.js";
import Map from "ol/Map";
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { baseMaps } from "../Layers/BaseMaps";

const MapWrapper = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // Convert center to OpenLayers coordinate format
  const olCenter = fromLonLat(center);

  // on component mount
  useEffect(() => {
    let options = {
      view: new View({ zoom, center: olCenter }),
      layers: baseMaps, // Alterado aqui
      // controls: [],
      // overlays: [],
    };

    let mapObject = new Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(olCenter);
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default MapWrapper;
