import React,{Component} from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pxToDp } from '../../../utils/stylesKits'
import SvgUri from 'react-native-svg-uri'
import {male,female} from "../../../res/fonts/iconSvg"
import {Input} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

class index extends Component {
    state = {
        nickname: "", 
        gender: "男",
        birthday: "",
        city: "",
        header: "",
        // 经度
        lng: "",
        // 纬度
        lat: "",
        address: ""
    }
    // 选择性别
    chooseGender=(gender)=>{
        this.setState({gender})
    }
    render() {
        const {gender,nickname,birthday}=this.state;
        const dateNow = new Date();
        const currentDate=`${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate}`
        return (
            <SafeAreaView style={{backgroundColor:"#fff",flex: 1, padding:pxToDp(20)}}>
                {/* 1.0标题开始 */}
            <Text style={{fontSize:pxToDp(20),color:"#666",fontWeight:"bold"}}>填写资料</Text>
            <Text style={{fontSize:pxToDp(20),color:"#666",fontWeight:"bold"}}>提升我的魅力</Text>
            {/* 标题结束 */}
            {/* 性别开始 */}
            <View style={{ marginTop:pxToDp(20)}}>
            <View style={{ justifyContent:"space-around", width:"60%", flexDirection:"row",alignSelf:"center" }}>    
            <TouchableOpacity onPress={this.chooseGender.bind(this,"男")}  style={{width:pxToDp(60),height:pxToDp(60),borderRadius:pxToDp(30),
            backgroundColor:gender==="男"?"red":"#eee",
            alignItems: "center",justifyContent:"center"}}>
            <SvgUri svgXmlData={male}  width="30" height="30"/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.chooseGender.bind(this,"女")}  style={{width:pxToDp(60),height:pxToDp(60),borderRadius:pxToDp(30),
            backgroundColor:gender==="女"?"red":"#eee",
            alignItems: "center",justifyContent:"center"}}>
            <SvgUri svgXmlData={female}  width="30" height="30"/>
            </TouchableOpacity>
            </View>
            </View>
            <View>
                <Input 
                value={nickname}
                placeholder="设置昵称"
                onChangeText={(nickname)=>this.setState({nickname})}
                />
            </View>
            {/* 4.0 */}
            <View>
            <DatePicker
                style={{width: "100%"}}
                date={birthday}
                mode="date"
                placeholder="设置生日"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate={currentDate}
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                dateIcon: {
                    display: "none",
                },
                dateInput:{
                    marginLeft:pxToDp(10),
                    borderWidth:0,
                    borderBottomWidth:pxToDp(1),
                    alignItems:"flex-start",
                    paddingLeft:pxToDp(4)
                },
                placeholderText:{
                    fontSize:pxToDp(18),
                    color:"#afafaf"
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(birthday) => {this.setState({birthday})}}
      />
            </View>
            </SafeAreaView>
        );
    }
}

export default index;