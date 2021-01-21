import { PermissionsAndroid } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";
import axios from "axios";
class Geo {
    async initGeo() {
    // 对于 Android 需要自行根据需要申请权限
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    await init({
        ios: "d0d49938f5a6648cc316fb1eca420cb6",
        android: "d0d49938f5a6648cc316fb1eca420cb6"
    });
    return Promise.resolve();
    }
    async getCurrentPosition() {
    return new Promise((resolve, reject) => {
        console.log("开始定位");
        Geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
        }, reject);
    })
    }
    async getCityByLocation() {
        await init({
            ios: "d0d49938f5a6648cc316fb1eca420cb6",
            android: "d0d49938f5a6648cc316fb1eca420cb6"
        });    
    const { longitude, latitude } = await this.getCurrentPosition();
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
        // key 
        params: { location: `${longitude},${latitude}`, key: "614c85fa560d77a7700a30d7b037ec7d", }
    });
    return Promise.resolve(res.data);
    }
}
   
   
   export default new Geo();