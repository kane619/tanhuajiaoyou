
import React,{Component} from "react";
import { Text ,StyleSheet,TouchableOpacity} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
 
// Within your render function
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    static defaultProps = {
      style:{},
      textStyle:{},
      disabled:false
    }
    render() {
        return (
          // 子容器超出就隐藏属性
          <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={{width:"100%",height:"100%",...this.props.style,overflow:"hidden"}}>
            <LinearGradient start={{x:0,y:0}} end={{x:1,y:0}} colors={['#9b63cd', '#e0708c']} style={styles.linearGradient}>
            {/* 解构 */}
            <Text style={{...styles.buttonText,...this.props.textStyle}}>
                {this.props.children}
            </Text>
            </LinearGradient>
            </TouchableOpacity>
        );
    }
}
 
// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default index;