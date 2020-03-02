import React from "react";
import Carousel from "./carousel/carousel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Carousel
        title="THE"
        array={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, "BMW"]}
      />
    </div>
  );
}

export default App;
