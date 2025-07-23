import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyEmail: { email: string };
  ChangePassword: { token: string };
};

export type OnboardingParamList = {
  Onboarding: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ArtworkDetails: { artworkId: string };
  Notifications: undefined;
};

export type ExploreStackParamList = {
  Explore: undefined;
  CategoryFilter: { categoryId?: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  MyOrders: undefined;
  OrderDetails: { orderId: string };
};

export type SupportStackParamList = {
  Support: undefined;
  FAQ: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
};

export type ArtistStackParamList = {
  ArtistDashboard: undefined;
  AddEditArtwork: { artworkId?: string }; // optional for edit
  MyArtworks: undefined;
  OrdersFromCustomers: undefined;
};

export type MainTabsParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ExploreStack: NavigatorScreenParams<ExploreStackParamList>;
  Wishlist: undefined;
  Cart: undefined;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type AppDrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  Settings: undefined;
  SupportStack: NavigatorScreenParams<SupportStackParamList>;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: NavigatorScreenParams<OnboardingParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppDrawer: NavigatorScreenParams<AppDrawerParamList>;
  ArtistStack: NavigatorScreenParams<ArtistStackParamList>;
};

// export type RootStackParamList = {
//   Splash: undefined;
//   Onboarding: undefined;
//   // Home: undefined;
//   AuthStack: undefined;
//   AppDrawer: undefined;
//   ArtistStack: undefined;
// };
