import React, { useContext, useEffect } from "react";
import OverviewMap from 'ol/control/OverviewMap';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import MapContext from "../Map/MapContext";
import "./MapOverview.css";

const MapOverview = () => {
  const { map } = useContext(MapContext);

  // Criando um elemento de imagem
  const image = document.createElement('img');
  image.src = `${import.meta.env.BASE_URL}overviewmap.png`; // Acesse a imagem na pasta public

  const overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    collapsed: true,
    collapseLabel: '«',
    label: image, // Use o elemento de imagem aqui,
    tipLabel: 'Abir overview map',
  });

  useEffect(() => {
    if (!map) {
      return;
    }
    map.addControl(overviewMapControl);

    return () => map.controls.remove(overviewMapControl);
  }, [map]);

  return <div></div>;
};

export default MapOverview;
