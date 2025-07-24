import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 14 Pro scale
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const widthRatio = SCREEN_WIDTH / BASE_WIDTH;
const heightRatio = SCREEN_HEIGHT / BASE_HEIGHT;

export const moderateScale = (size: number, factor: number = 0.5): number => {
  const newSize = size * widthRatio;
  return size + (newSize - size) * factor;
};

export const verticalScale = (size: number): number => {
  const scaledSize = size * heightRatio;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
  }
  return scaledSize;
};

export const horizontalScale = (size: number): number => {
  const scaledSize = size * widthRatio;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
  }
  return scaledSize;
};

export const scaleFont = (size: number): number => {
  const scaledSize = size * Math.min(widthRatio, heightRatio);

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
  }
  return scaledSize;
};
