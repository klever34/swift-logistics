import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {colors} from '../../constants/index';
// import {SliderBox} from 'react-native-image-slider-box';
import {AuthContext} from '../../../context';
import AsyncStorage from '@react-native-community/async-storage';

const WalkThrough = (props) => {
  const {onboarded} = React.useContext(AuthContext);
  
  const goToLogin = async () => {
    await AsyncStorage.setItem('@user_onboarded', 'true');
    onboarded();
  };

  const guideData = [
    {
      id: 0,
      header: 'Request Order',
      subHeader:
        'It looks like you are on track. Please continue to follow your daily plan',
      color: '#64245C',
    },
    {
      id: 1,
      header: 'Schedule Pickups',
      subHeader: 'Select your preferred date and time of pickup',
      color: '#03034A',
    },
    {
      id: 3,
      header: 'Make Easy Payment',
      subHeader:
        'It looks like you are on track. Please continue to follow your daily plan',
      color: '#64245C',
    },
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = [
    require('../../assets/images/pic1.png'),
    require('../../assets/images/pic2.png'),
    require('../../assets/images/pic3.png'),
  ];

  const nextSlideImg = () => {
    incrementIndex();
  };

  const incrementIndex = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <SafeAreaView
      style={{backgroundColor: guideData[currentIndex].color, flex: 1}}>
      <ScrollView>
        <View
          style={{
            paddingVertical: 20,
            flex: 1,
            marginTop: 20,
          }}>
          <View style={{paddingHorizontal: 30}}>
            <Text
              style={{
                color: colors.textColor,
                textAlign: 'right',
                fontSize: 18,
                fontFamily: 'AirbnbCerealBold',
                paddingBottom: 10,
              }}
              onPress={() => goToLogin()}>
              Skip
            </Text>
          </View>
          <View style={styles.carouselContainer}>
            <Image
              source={images[currentIndex]}
              style={{
                // width: '100%',
                height: 400,
                resizeMode: 'contain',
                aspectRatio: 1.5,
                // paddingLeft: currentIndex === 2 ? -150 : 0,
                marginLeft: currentIndex === 2 ? -100 : 0,
                marginRight: currentIndex === 0 ? -100 : 0,
              }}
            />
          </View>
          <View style={{paddingHorizontal: 30}}>
            <View>
              <Text style={styles.bigText}>
                {guideData[currentIndex].header}
              </Text>
              <Text style={styles.smallText}>
                {guideData[currentIndex].subHeader}
              </Text>
              <View style={styles.dots}>
                <TouchableOpacity
                  onPress={() => setCurrentIndex(0)}
                  style={
                    currentIndex === 0
                      ? styles.singleActiveDot
                      : styles.singleDot
                  }>
                  <Text />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentIndex(1)}
                  style={
                    currentIndex === 1
                      ? styles.singleActiveDot
                      : styles.singleDot
                  }>
                  <Text />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentIndex(2)}
                  style={
                    currentIndex === 2
                      ? styles.singleActiveDot
                      : styles.singleDot
                  }>
                  <Text />
                </TouchableOpacity>
              </View>

              {currentIndex < 2 && (
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => nextSlideImg()}>
                  <Text style={styles.btnTxt}>Next</Text>
                </TouchableOpacity>
              )}
              {currentIndex === 2 && (
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => goToLogin()}>
                  <Text style={styles.btnTxt}>Get Started</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  startBtn: {
    backgroundColor: '#80C050',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 6,
  },
  bigText: {
    fontFamily: 'AirbnbCerealBold',
    color: colors.textColor,
    fontSize: 24,
    textAlign: 'center',
  },
  smallText: {
    fontFamily: 'AirbnbCerealLight',
    opacity: 0.5,
    color: colors.textColor,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  btnTxt: {
    color: '#fff',
    fontFamily: 'AirbnbCerealBold',
    fontSize: 16,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  singleDot: {
    backgroundColor: '#828282',
    opacity: 0.4,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 100,
    width: 10,
    height: 10,
  },
  singleActiveDot: {
    backgroundColor: '#80C050',
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 100,
    width: 10,
    height: 10,
  },
});

export default WalkThrough;
