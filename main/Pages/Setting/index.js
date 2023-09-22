import React,{useState} from 'react';
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
import { BottomSheet } from 'react-native-btr';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const Setting = ({navigation}) => {
  //Multi language
  const { t, i18n: i18nInstance } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  async function ChangeLanguage(language) {
    await i18nInstance.changeLanguage(language); 
    setSelectedLanguage(language); 
  }
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

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
          <Text style={stylesSettingList.text}> {t('setting')} </Text>
        </View>
        <View>
          <View style={stylesSettingList.icon}>
            <View style={stylesBtnSetting.container}>
              <TouchableOpacity
                style={stylesBtnSetting.btn}
                onPress={SetPassword}>
                <IconKey width={35} height={35}></IconKey>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>{t('setPassword')}</Text>
            </View>
            <View style={[stylesBtnSetting.container]}>
              <TouchableOpacity style={stylesBtnSetting.btn} onPress={RateApp}>
                <Image source={require('../../Assets/Rateapp.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>{t('rateApp')}</Text>
            </View>
            <View style={stylesBtnSetting.container}>
              <TouchableOpacity
                style={stylesBtnSetting.btn}
                onPress={ShareInfo}>
                <Image source={require('../../Assets/Share.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>{t('share')}</Text>
            </View>
            <View style={[stylesBtnSetting.container]}>
              <TouchableOpacity style={stylesBtnSetting.btn} onPress={FeedBack}>
                <Image source={require('../../Assets/FeedBack.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>{t('feedback')}</Text>
            </View>
            <View style={stylesBtnSetting.container}>
              <TouchableOpacity style={stylesBtnSetting.btn} onPress={toggleBottomNavigationView}>
                <Image style={{width : 100,height : 100}}
                source={require('../../Assets/langua.png')}></Image>
              </TouchableOpacity>
              <Text style={stylesBtnSetting.text}>{t('languages')}</Text>
              <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
              >
                <View style={stylesSettingList.bottomNavigationView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        padding: 20,
                        fontSize: 20,
                        color: '#FFFFFF',
                      }}>
                      {t('languageF')}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginVertical: 50, }}>
                      <TouchableOpacity
                        style={{ marginLeft: 20 }}
                        onPress={() => ChangeLanguage('vi')}
                      >
                        <Image style={{ width: 80, height: 80, justifyContent: 'flex-start', marginRight: 70 }}
                          source={require('../../Assets/vi.png')} />
                        <Text style={{
                          fontWeight : 'bold',
                          color: selectedLanguage === 'vi' ? '#33A850' : '#FFFFFF',
                          marginTop : 10,
                          marginLeft : selectedLanguage === 'en' ? 3 : 8,
                          }}>{t('vi')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => ChangeLanguage('en')}
                      >
                        <Image style={{ width: 80, height: 80 }}
                          source={require('../../Assets/en.png')} />
                        <Text style={{
                          fontWeight : 'bold',
                          color: selectedLanguage === 'en' ? '#33A850' : '#FFFFFF',
                          marginTop : 10,
                          marginLeft : selectedLanguage === 'en' ? 18 : 10,
                          }}>{t('en')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </BottomSheet>
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
  bottomNavigationView: {
    backgroundColor: '#0F1946',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Setting;
