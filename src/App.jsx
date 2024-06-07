import React, { useState } from "react";
import MapWrapper from "./components/Map/Map";
import MapComponents from "./components/MapComponents/MapComponents";
import MapOverview from "./components/MapComponents/MapOverview";
import AccordionMenu from "./components/Menu/AccordionMenu";
import DrawFeatures from './components/MapComponents/DrawFeatures';
import "./App.css";

const App = () => {
  const [zoom, setZoom] = useState(14);
  const [center, setCenter] = useState([-51.2177, -30.0346]);

  return (
    <div className="App">
      
      <MapWrapper zoom={zoom} center={center}>
      
      <MapComponents>
      <AccordionMenu/>
                <MapOverview />
                <DrawFeatures />
      </MapComponents>
      </MapWrapper>
    </div>
  );
};

export default App;
