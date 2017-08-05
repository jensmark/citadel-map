import React from 'react';
import {render} from 'react-dom';
import ReactMapboxGl, { Layer, Source, ZoomControl, RotationControl } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  minZoom: 0,
  maxZoom: 7,
  renderWorldCopies: false
});

const style = {
  "version": 8,
  "sources": {
    "raster-tiles": {
      "type": "raster",
      "tiles": [
        "http://localhost:3000/tiles/base/{z}/{x}/{y}/tile.jpg",
      ],
      "tileSize": 256,
      "minzoom": 0,
      "maxzoom": 5
    }
  },
  "layers": [{
    "id": "simple-tiles",
    "type": "raster",
    "source": "raster-tiles",
    "minzoom": 0,
    "maxzoom": 8
  }]
}

class App extends React.Component {
  render () {
    return (
        <Map
          style={style}
          zoom={[0]}
          center={[0,0]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
        }}>
          <ZoomControl/>
          <RotationControl/>
        </Map>
    );
  }
}

render(<App/>, document.getElementById('app'));