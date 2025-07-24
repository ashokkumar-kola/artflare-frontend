import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStackNavigation from '../navigation/HomeStackNavigation';
import ExploreStackNavigation from '../navigation/ExploreStackNavigation';
import WishlistScreen from '../screens/wishlist/WishlistScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileStackNavigation from './ProfileStackNavigation';

import { colors } from '../utils/colors';
import type { MainTabsParamList } from './types';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="home-outline" color={color} size={size} />
);

const ExploreIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="magnify" color={color} size={size} />
);

const WishlistIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="heart-outline" color={color} size={size} />
);

const CartIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="account-outline" color={color} size={size} />
);

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.quaternary,
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'absolute',
                    overflow: 'hidden',
                },
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigation}
                options={{
                    tabBarIcon: HomeIcon,
                    tabBarLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="ExploreStack"
                component={ExploreStackNavigation}
                options={{
                    tabBarIcon: ExploreIcon,
                    tabBarLabel: 'Explore',
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{
                    tabBarIcon: WishlistIcon,
                    tabBarLabel: 'Wishlist',
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: CartIcon,
                    tabBarLabel: 'Cart',
                }}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStackNavigation}
                options={{
                    tabBarIcon: ProfileIcon,
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
}
