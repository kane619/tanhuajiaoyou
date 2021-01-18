import React,{Component} from "react";
import { View,Text,Image,StatusBar,StyleSheet } from "react-native";
import { pxToDp } from "../../../utils/stylesKits"
import { Input } from 'react-native-elements';
import validator from '../../../utils/validator'
import request from '../../../utils/request'
import {ACCOUNT_LOGIN} from '../../../utils/pathMap'
import THButton from '../../../components/THButton'
import {
    CodeField,
    Cursor,
  } from 'react-native-confirmation-code-field';

class index extends Component {
    state={
        phoneNumber:'15945612345',
        phoneValid:true,
        // 是否显示登陆界面
        showLogin:false,
        vcodeTxt:""
    }
    //登录框手机号输入
    phoneNumberChangeText=(phoneNumber)=>{
        this.setState({phoneNumber})
        console.log(phoneNumber);
    }
    // 手机号码点击 完成
    phoneNumberSubmitEditing = async () => {
        //1 对手机号码的合法性校验 正则
        // 2将手机号码发送到后台对应接口 -》获取验证码
        // 3将登录界面切换成填写验证码的界面
       const {phoneNumber}=this.state;
       const phoneValid = validator.validatePhone(phoneNumber);
       if (!phoneValid) {
           //没通过
           this.setState({phoneValid});
           return;
       }
       const res = await request.post(ACCOUNT_LOGIN,{phone:phoneNumber})
       console.log(res);
       if (res.code=="10000"){
        //    请求成功
          this.setState({ showLogin: false });
       }else{

       }
    }
    // 验证码输入框值改变事件
    onVcodeChangeText=(vcodeTxt)=>{
        this.setState({vcodeTxt})
     }

    //渲染登陆界面
    renderLogin=()=>{
        const {phoneNumber,phoneValid} = this.state;
        return (
            <View><Text style={{fontSize:pxToDp(25),color:"#888",fontWeight:"bold"}}>手机号登录注册</Text>
            {/* 登陆开始 */}
            {/* 输入框 */}
            <View style={{marginTop:pxToDp(30)}}>
                <Input placeholder='请输入手机号' maxLength={11}
                value={phoneNumber}
                inputStyle={{color:"#333"}}
                onChangeText={this.phoneNumberChangeText}
                errorMessage={phoneValid ? "" : "手机号码格式不正确"}
                onSubmitEditing={this.phoneNumberSubmitEditing}
                returnKeyType="done"
                leftIcon={{name: 'phone',color:'#ccc',size:pxToDp(20) }}/>
            </View>
            {/* 渐变按钮 */}
            <View>
                <View style={{width:"85%",height:40,alignSelf:"center"}}><THButton onPress={this.phoneNumberSubmitEditing} style={{borderRadius:20}}>获取验证码</THButton></View>
            </View>
            </View>
        )
    }
    // 渲染填写验证码界面
    renderVcode=()=>{
        const {phoneNumber,vcodeTxt} = this.state;
       return(
        <View>   
        <View><Text style={{fontSize:pxToDp(25),color:"#888",fontWeight:"bold"}}>输入6位验证码</Text></View>
        <View><Text style={{marginTop:pxToDp(15)}}>已发送到：+86 {phoneNumber}</Text></View>
        <View style={{marginTop:pxToDp(15)}}>
            <View>
                <CodeField
                    value={vcodeTxt}
                    onChangeText={this.onVcodeChangeText}
                    cellCount={6}
                    rootStyle={styles.codeFiledRoot}
                    keyboardType="number-pad"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    )}
                />
            </View>
             <View style={{marginTop:pxToDp(15),width:"85%",height:40,alignSelf:"center"}}><THButton onPress={this.phoneNumberSubmitEditing} style={{borderRadius:20}}>重新获取</THButton></View>
        </View>
        </View>
       )
    }

    render() {
        const {showLogin} = this.state;
        return (
            <View >
                {/* 0.0 手机状态栏 */}
                <StatusBar backgroundColor="red" translucent={true}/>
                {/* 1.0背景图片 开始 */}
                {/* 200单位是dp 单位px -> dp单位转化 */}
                <Image style={{width:"100%",height:pxToDp(210)}} source={require("../../../res/profileBackground.jpg")}></Image>
                {/* 1.0 背景图片 结束 */}
                
                {/* 内容开始 */}
                <View style={{padding:pxToDp(20)}}>
                    {/* 登陆开始 */}
                    {showLogin? this.renderLogin() : this.renderVcode()}
                      
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFiledRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
      color:"#7d53ea"
    },
    focusCell: {
      borderColor: '#7d53ea',
    },
  });

export default index;