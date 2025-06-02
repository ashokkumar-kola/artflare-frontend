import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const TopHeader = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.topBar}>
        {/* Left Icon */}
        <TouchableOpacity style={styles.iconWrapper}>
          <Icon name="bars" size={28} color='#A45EE3' />
        </TouchableOpacity>

        {/* Center Logo */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoWrapper}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Right Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.iconWrapper}>
          <View style={styles.userCircle}>
            <Icon name="user" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Concave Curve */}
      <View style={[styles.concaveCurve, { width: screenWidth + 100 }]} />
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
    zIndex: 10,
  },
  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    top: -12,
  },
  logo: {
    width: 110,
    height: 70,
    // position:'absolute',

  },
  userCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A45EE3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A45EE3',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    // margin:8,
  },
  // concaveCurve: {
  //   position: 'absolute',
  //   bottom: -20,
  //   left: '50%',
  //   height: 40,
  //   transform: [{ translateX: -((Dimensions.get('window').width + 100) / 2) }],
  //   backgroundColor: '#000',
  //   borderBottomLeftRadius: 300,
  //   borderBottomRightRadius: 300,
  //   zIndex: -1,
  // },
});
