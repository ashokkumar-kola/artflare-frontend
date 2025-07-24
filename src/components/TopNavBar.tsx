import React from 'react';
import { 
  View, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  Dimensions,
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { moderateScale, verticalScale, horizontalScale } from '../utils/scaling';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AppDrawer'>;

const TopHeader = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleHomePress = () => {
    navigation.navigate('AppDrawer', {
      screen: 'MainTabs',
      params: {
        screen: 'HomeStack',
        params: {
          screen: 'Home',
        },
      },
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('AuthStack', {
      screen: 'Login',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <View style={styles.topBar}>
          {/* Left Icon - Menu */}
          <TouchableOpacity
            onPress={handleMenuPress}
            style={styles.iconWrapper}
            accessibilityLabel="Menu"
            accessibilityRole="button"
            accessibilityHint="Opens navigation menu"
          >
            <Icon
              name="bars"
              size={moderateScale(24)}
              color="#A45EE3"
            />
          </TouchableOpacity>

          {/* Center Logo */}
          <TouchableOpacity
            onPress={handleHomePress}
            style={styles.logoWrapper}
            accessibilityLabel="Home"
            accessibilityRole="button"
            activeOpacity={0.8}
          >
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>

          {/* Right Icon - Profile */}
          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.iconWrapper}
            accessibilityLabel="User profile"
            accessibilityRole="button"
            accessibilityHint="Navigates to login screen"
            activeOpacity={0.8}
          >
            <View style={styles.userCircle}>
              <Icon name="user" size={moderateScale(16)} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  headerWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  topBar: {
    height: verticalScale(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    position: 'relative',
  },
  iconWrapper: {
    width: moderateScale(44),
    height: moderateScale(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(22),
    overflow: 'hidden',
  },
  logoWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -moderateScale(55) }],
    top: verticalScale(Platform.OS === 'ios' ? -8 : -12),
  },
  logo: {
    width: horizontalScale(110),
    height: verticalScale(70),
  },
  userCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#A45EE3',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#A45EE3',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
