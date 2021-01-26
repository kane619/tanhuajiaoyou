import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import Svg from "react-native-svg-uri";
import {tanhua,near,testSoul  } from "../../../../res/fonts/iconSvg";
import { pxToDp } from '../../../../utils/stylesKits';
import { NavigationContext } from "@react-navigation/native";
class Index extends Component {
  static contextType=NavigationContext;
  goPage=(page)=>{
    // this.context === this.props.navigation
    this.context.navigate(page);
  }
  render() {
    return (
      <View style={{flexDirection:"row",width:"80%",justifyContent:"space-around"}} >
        <TouchableOpacity
        onPress={()=>this.goPage("TanHua")}
        style={{alignItems:"center"}}
        >
          <View style={{width:pxToDp(70),height:pxToDp(70),borderRadius:pxToDp(35),
          backgroundColor:"red",justifyContent:"center",alignItems:"center"
          }} >
            <Svg width="40" height="40" fill="#fff" svgXmlData={tanhua}  /> 
          </View>
          <Text style={{fontSize:pxToDp(18),marginTop:pxToDp(4),color:"#ffffff9a"}} >探花</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{alignItems:"center"}}
        onPress={()=>this.goPage("Search")}
        >
          <View style={{width:pxToDp(70),height:pxToDp(70),borderRadius:pxToDp(35),
          backgroundColor:"#2db3f8",justifyContent:"center",alignItems:"center"
          }} >
            <Svg width="40" height="40" fill="#fff" svgXmlData={near}  /> 
          </View>
          <Text style={{fontSize:pxToDp(18),marginTop:pxToDp(4),color:"#ffffff9a"}} >搜附近</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{alignItems:"center"}}
        onPress={()=>this.goPage("TestSoul")}
        >
          <View style={{width:pxToDp(70),height:pxToDp(70),borderRadius:pxToDp(35),
          backgroundColor:"#ecc768",justifyContent:"center",alignItems:"center"
          }} >
            <Svg width="40" height="40" fill="#fff" svgXmlData={testSoul}  /> 
          </View>
          <Text style={{fontSize:pxToDp(18),marginTop:pxToDp(4),color:"#ffffff9a"}} >测灵魂</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Index;