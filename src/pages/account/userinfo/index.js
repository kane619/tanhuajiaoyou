import React from "react";
import { View,Text,TouchableOpacity,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pxToDp } from '../../../utils/stylesKits'
import SvgUri from 'react-native-svg-uri'
import {male,female} from "../../../res/fonts/iconSvg"
import {Input} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Geo from '../../../utils/Geo'
import Picker from 'react-native-picker';
import CityJson from '../../../res/citys.json'
import THButton from '../../../components/THButton'
import Toast from '../../../utils/Toast'
import ImagePicker from 'react-native-image-crop-picker';
import { Overlay } from "teaset";
import {inject,observer} from 'mobx-react'
import { ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO } from "../../../utils/pathMap";
import request from '../../../utils/request'
import JMessage from '../../../utils/JMessage'

@inject("RootStore") // 注入 用来获取 全局数据的
@observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据
class index extends React.Component {

    state = {
        nickname: "", 
        gender: "男",
        birthday: "",
        city: "",
        header: "",
        // 经度
        lng: "120.646779",
        // 纬度
        lat: "31.244261",
        address: "sdfg"
    }
    async componentDidMount() {
        console.log(this.props);
        const res = await Geo.getCityByLocation();
        console.log(res);
        // const address = res.regeocode.addressComponent.formatted_address
        // const city = res.regeocode.addressComponent.city.replace("市","");
        // const lng = regeocode.addressComponent.streetNumber.locations.split(",")[0];
        // const lat = regeocode.addressComponent.streetNumber.locations.split(",")[1];
        // this.setState({address,city,lng,lat});
    }
    // 选择性别
    chooseGender=(gender)=>{
        this.setState({gender})
    }
    // 选择城市
    showCityPicker = () => {
        console.log("选择城市")        
        Picker.init({
            pickerData: CityJson,
            selectedValue: ["北京", "北京"],
            wheelFlex: [1, 1, 0], // 显示省和市
            pickerConfirmBtnText: "确定",
            pickerCancelBtnText: "取消",
            pickerTitleText: "选择城市",
            onPickerConfirm: data => {
              // data =  [广东，广州，天河]
              this.setState(
                {
                  city: data[1]
                }
              );
            }
          });
        Picker.show();
    }
    // 点击设置头像按钮
    chooseHeadImg = async () =>{
        // 1 交易前面是否为空
        // 2 使用图片裁剪插件
        // 3 将选择好的图片 上传到后台
        // 4. 表单上传 完成信息填写
        // 5 成功 // 1.执行 极光注册 极光登录 2.跳转交友首页
        const {nickname,birthday,city}=this.state;
        if (!nickname||!birthday||!city) {
           Toast.sad("昵称或者生日或者城市不合法",2000,"center");
            return
        }
        // 获取到 选中后的图片
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }); 
        console.log(image);
        let overlayViewRef=null;
        // 显示审核中效果
        let overlayView = (
            <Overlay.View
              style={{flex:1,backgroundColor:"#000"}}
              modal={true}
              overlayOpacity={0}
              ref={v => overlayViewRef = v}>
              <View style={{marginTop:pxToDp(50),alignSelf:"center",width:334,height:334,position:"relative",justifyContent:"center",alignItems:"center" }}>
                <Image style={{width:"100%",height:"100%",
                position:"absolute",left:0,top:0,zIndex:100}} 
                source={require("../../../res/scan.gif")}/>
                <Image source={{uri:image.path}} style={{width:"60%",height:"60%"}}/>
              </View>
            </Overlay.View>
          );
        Overlay.show(overlayView);
        // 上传头像
        const res0 = await this.uploadHeadImg(image)
        if(res0.code !== "10000"){ //上传成功
        //    失败
           return;
        }
    //    构造参数完善个人信息
       let params = this.state;
       params.header = res0.data.headImgPath;
       console.log(params);
       const res1 = await request.privatePost(ACCOUNT_REGINFO,params)
    //    console.log(res1);
       if (res1.code!=="10000"){
           console.log(res1);
           return;
       }
    //    注册极光
       const res2 = await this.jgBusiness(this.props.RootStore.userId,this.props.RootStore.mobile);
    //    console.log(res2); 
    // 关闭浮层
    overlayViewRef.close();
    Toast.smile("恭喜 操作成功",2000,"center");
    setTimeout(()=>{
       alert("跳转交友界面")
    },2000)

    }
    // 上传头像
    uploadHeadImg =(image) =>{
         // 构造参数
        let formData = new FormData();
        formData.append("headPhoto",{
           // 本地图片的地址
            uri: image.path,
            // 图片的类型
            type: image.mime,
            // 图片的名称 file:///store/com/pic/dsf/d343.jpg
            name: image.path.split("/").pop()
        })
        // 执行头像上传
        return request.privatePost(ACCOUNT_CHECKHEADIMAGE,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
    }
    // 执行极光的注册
    jgBusiness = (username, password)=>{
        return JMessage.register(username, password)
    }
    render() {
        const {gender,nickname,birthday,address,city}=this.state;
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
                useNativeDriver="true"
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
            {/* 地址 */}
            <View style={{marginTop:pxToDp(20)}} >
                {/* <TouchableOpacity style={{height:20}} onPress={this.showCityPicker} backgroundColor="red"> */}
                <Input 
                  value={"当前定位:"+city}
                  inputStyle={{color: "#666"}}
                  onFocus={this.showCityPicker}
                />
                {/* </TouchableOpacity> */}
            </View>
            {/* 选择头像 */}
            <View> 
             <THButton onPress={this.chooseHeadImg} style={{height:pxToDp(40),borderRadius:pxToDp(20),alignSelf:"center"}}>设置头像</THButton>
            </View>
            </SafeAreaView>
        );
    }
}

export default index;