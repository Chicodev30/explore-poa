import React, { useContext, useState, useEffect } from "react";
import MapContext from "../Map/MapContext";
import { Draw, Snap } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Style, Stroke } from "ol/style";
import Select from "ol/interaction/Select";
import "./DrawFeatures.css";

const DrawFeatures = () => {
  const { map } = useContext(MapContext);
  const [featureType, setFeatureType] = useState("None");
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (!map) {
      return;
    }

    const source = new VectorSource({ wrapX: false });
    const vector = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new Stroke({
          color: '#000000', // Definindo a cor do traço para preto
          width: 2,
        }),
      }),
    });

    let drawInteraction;
    const snap = new Snap({ source: source });

    const mapInteraction = () => {
      if (draw) {
        map.removeInteraction(draw);
      }
      map.removeInteraction(snap);

      if (featureType !== "None" && featureType !== "Clear") {
        drawInteraction = new Draw({
          source: source,
          type: featureType,
          style: new Style({
            stroke: new Stroke({
              color: '#000000', // Definindo a cor do traço para preto
              width: 2,
            }),
          }),
        });
        setDraw(drawInteraction);
        map.addInteraction(drawInteraction);
        map.addInteraction(snap);
      } else if (featureType === "Clear") {
        source.clear();
        map.removeLayer(vector);
      }
    };

    map.addLayer(vector);
    mapInteraction();

    return () => {
      if (drawInteraction) {
        map.removeInteraction(drawInteraction);
      }
      map.removeInteraction(snap);
      map.removeLayer(vector);
    };
  }, [featureType, map]);

  const changeHandler = (type) => {
    setFeatureType(type);
  };

  const downloadFeatureHandler = () => {
    const select = new Select();
    const selectedFeature = select.getFeatures();
    console.log(selectedFeature);
  };

  const undoHandler = (e) => {
    e.preventDefault();
    if (draw) {
      draw.removeLastPoint();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        undoHandler(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [draw]);

  return (
    <div className="drawFeature d-flex">
      <div className="button-group">
        <button
          className={`btn ${featureType === 'None' ? 'btn-selected' : ''}`}
          onClick={() => changeHandler('None')}
        >
          <img src="mousepoint.png" alt="mouse pointer" />
        </button>
        <button
          className={`btn ${featureType === 'Point' ? 'btn-selected' : ''}`}
          onClick={() => changeHandler('Point')}
        >
          <img src="point.png" alt="ponto" />
        </button>
        <button
          className={`btn ${featureType === 'LineString' ? 'btn-selected' : ''}`}
          onClick={() => changeHandler('LineString')}
        >
          <img src="line.png" alt="linha" />
        </button>
        <button
          className={`btn ${featureType === 'Polygon' ? 'btn-selected' : ''}`}
          onClick={() => changeHandler('Polygon')}
        >
          <img src="polygon.png" alt="poligono" />
        </button>
        <button
          className={`btn ${featureType === 'Circle' ? 'btn-selected' : ''}`}
          onClick={() => changeHandler('Circle')}
        >
          <img src="circle.png" alt="circulo" />
        </button>
        <button
          className={`btn ${featureType === 'Clear' ? 'btn-selected' : ''}`}
          onClick={() => changeHandler('Clear')}
        >
          <img src="eraser.png" alt="borracha" />
        </button>
        <button className="btn undo-button" onClick={undoHandler}>
          <img className="undo-image" src="undo.png" alt="voltar" />
        </button>
      </div>
      <button
        className="btn download-button"
        id="download"
        onClick={downloadFeatureHandler}
      >
        <img className="download-image" src="download.png" alt="download" />
      </button>
    </div>
  );
};

export default DrawFeatures;
