import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ route, navigation }: any) => {
  const [showLogout, setShowLogout] = useState(false);
  const [userName, setUserName] = useState(route.params?.userName || null);

  const handleLogout = () => {
    setUserName(null);
    setShowLogout(false);
    Alert.alert('Logged out');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          {userName ? `Welcome ${userName}` : 'Welcome'}
        </Text>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => setShowLogout(!showLogout)}
        >
          <Icon name="user" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Center User Name */}
      {userName && (
        <View style={styles.centerContent}>
          <Icon name="user-circle" size={80} color="#A45EE3" />
          <Text style={styles.userName}>{userName}</Text>
        </View>
      )}

      {/* Logout */}
      {showLogout && userName && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#A45EE3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A45EE3',
    textAlign: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A45EE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A45EE3',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#A45EE3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});