import React from "react";
import { View,Text,Image } from "react-native";

class index extends Component {
    render() {
        return (
            <View >
                {/* 1.0背景图片 开始 */}
                <Image source={require("../../../src/res/profileBackground.jpg")}></Image>
                <Text>登录</Text>
            </View>
        );
    }
}

export default index;