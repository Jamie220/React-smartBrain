import React from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin'
import Clarifai from 'clarifai';
import './App.css';

const ParticlesOption = {
  "particles": {
    "number": {
      "value": 150
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '06ee0220ffed42bb9c0b22e2b0cba377'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  drawFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onChangeInput = (events) => {
    this.setState({ input: events.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.drawFaceBox(this.calculateFaceLocation(response)))// do something with response
      .catch((err) => console.log(err));// do something with error   
  }

  onRouteChange = () =>{
    this.setState({route:'home'});
  }

  backSignin = () =>{
    this.setState({route: 'signin'})
  }


  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={ParticlesOption} />
        <Navigation backSignin={this.backSignin} />
        { this.state.route === 'signin'
          ?<Signin onRouteChange = {this.onRouteChange}/>
          :<div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onChangeInput={this.onChangeInput}
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
        }
      </div>
    );
  }
}
export default App;
