import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

import "./App.css";

const app = new Clarifai.App({
  apiKey: "0c56b22fab71436b9714af496220e24a"
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  }

  onInputChange = event => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log("click");
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b",
        "https://samples.clarifai.com/face-det.jpg"
      )
      .then(
        function(response) {
          console.log(response);
          // do something with response
        },
        function(err) {
          // there was an error
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition />}
      </div>
    );
  }
}

export default App;
