import React from 'react';
import { AppRegistry, asset, Model, AmbientLight, PointLight, Box, Pano, Text, View } from 'react-vr';

export default class HelloVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 130,
    };
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }

  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta / 150
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  render() {
    return (
      <View>
        <Pano source={asset('crowd.jpg')}/>
        <AmbientLight intensity={0.6} />
        <PointLight intensity={1.0} />
        <Box 
          lit={true}
          style={{
            transform: [
              {scale: 0.05},
              {translate: [0, 1, -5]},
              {rotateY: this.state.rotation}
            ],
            color: 'crimson'
          }}
        />
        <Model 
          source={{obj:asset('IronMan.obj'), mtl:asset('IronMan.mtl')}} lit={true}
          style={{
            transform: [
              {scale: 0.005},
              {translate: [-1, 150, -200]},
              {rotateX: 90}
            ]
          }} 
        />  
      </View>
    );
  }
};

AppRegistry.registerComponent('HelloVR', () => HelloVR);
