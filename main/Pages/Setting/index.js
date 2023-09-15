import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Linking,
  SafeAreaView,
} from 'react-native';
import InAppReview from 'react-native-in-app-review';
import Information from '../../Common/env';
import IconKey from "main/Assets/key.svg"
import Share from 'react-native-share';

const Setting = ({navigation}) => {
  function SetPassword() {
    console.log(navigation.navigate('SecretPass'));
  }
  async function RateApp() {
    try {
      console.log('RATE APP:', InAppReview.isAvailable());
      InAppReview.isAvailable(); 
      const response = await InAppReview.RequestInAppReview();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  function ShareInfo() {
    const shareInfo = {
      message: Information.app_link,
    };
    Share.open(shareInfo);
  }
  function FeedBack() {
    Linking.openURL('mailto:' + Information.emailFeedBack);
  }
  function Policy() {
    Linking.openURL(Information.policyWebSite);
  }
  return (
    <SafeAreaView>
      <View style={stylesSettingList.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View
            style={{
              backgroundColor: '#F7BE13',
              width: 5,
              height: 32,
            }}
          />
          <Text style={stylesSettingList.text}> CÀI ĐẶT </Text>
        </View>
        <View>
          <View style={stylesSettingList.icon}>
            <View style={stylesBtnSetting.container}>
              <TouchableOpacity
                style={stylesBtnSetting.btn}
                onPress={SetPassword}>
                <IconKey width={35} height={35}></IconKey>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>Đặt mật khẩu</Text>
            </View>
            <View style={[stylesBtnSetting.container]}>
              <TouchableOpacity style={stylesBtnSetting.btn} onPress={RateApp}>
                <Image source={require('../../Assets/Rateapp.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>Đánh giá</Text>
            </View>
            <View style={stylesBtnSetting.container}>
              <TouchableOpacity
                style={stylesBtnSetting.btn}
                onPress={ShareInfo}>
                <Image source={require('../../Assets/Share.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>Chia sẻ</Text>
            </View>
            <View style={[stylesBtnSetting.container]}>
              <TouchableOpacity style={stylesBtnSetting.btn} onPress={FeedBack}>
                <Image source={require('../../Assets/FeedBack.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>Lời nhắn</Text>
            </View>
            <View style={stylesBtnSetting.container}>
              <TouchableOpacity style={stylesBtnSetting.btn} onPress={Policy}>
                <Image style={{width : 100,height : 100}}
                source={require('../../Assets/langua.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>Ngôn ngữ</Text>
            </View>
            <View style={stylesBtnSetting.container}></View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const stylesBtnSetting = StyleSheet.create({
  btn: {
    width: 98,
    height: 98,
    borderWidth: 1,
    borderColor: '#2F3652',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '35%',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#FFFFFF',
    marginTop: 11,
  },
});

const stylesSettingList = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Open Sans',
    marginLeft: 10,
    color: '#fff',
  },

  icon: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  container: {
    paddingTop: 30,
    backgroundColor: 'black',
    height: '100%',
  },
});
export default Setting;
