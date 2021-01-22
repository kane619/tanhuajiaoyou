
import React from 'react';
import {View} from 'react-native';
import Nav from './src/nav'
import Geo from './src/utils/Geo'
import RootStore from './src/mobx'
import {Provider} from 'mobx-react'
import JMessage from './src/utils/JMessage'

class App extends React.Component {
  state = {
    isInitGeo:false
  }
  async componentDidMount() {
    await Geo.initGeo();
    // 极光初始化
    JMessage.init();
    this.setState({isInitGeo:true});
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Provider RootStore={RootStore}>
        {this.state.isInitGeo?<Nav></Nav> : <></>}
        </Provider>
      </View> 
    );
  }
}

export default App;
