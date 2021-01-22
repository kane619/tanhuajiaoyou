import JMessage from "jmessage-react-plugin";

export default{
    // 初始化
    init(){
        JMessage.init({
            'appkey': '48cbc7cca1373cf1c2fe812f',
            'isOpenMessageRoaming': true,
            'isProduction': true,
            'channel': '' 
        })
    }, 
    // 注册
  register(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.register({
        username,
        password
      }, resolve, reject)
    })
  },
  // 登录
  login(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.login({
        username,
        password
      }, resolve, reject)
    })
  },
}