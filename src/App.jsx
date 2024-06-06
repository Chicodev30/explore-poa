import React, { useState } from "react";
import MapWrapper from "./components/Map/Map";
import "./App.css";

const App = () => {
  const [zoom, setZoom] = useState(14);
  const [center, setCenter] = useState([-51.2177, -30.0346]);

  return (
    <div className="App">
      <MapWrapper zoom={zoom} center={center}>
        {/* Você pode adicionar mais componentes ou funcionalidades aqui */}
      </MapWrapper>
    </div>
  );
};

export default App;
