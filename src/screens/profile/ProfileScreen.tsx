// screens/ProfileScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;       // optional URL if you store one
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName]   = useState('');
  const [editEmail, setEditEmail] = useState('');

  /* ------------ load from storage ------------ */
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('userData');
      if (!raw) {
        navigation.navigate('Login' as never);
        return;
      }
      try {
        const parsed: User = JSON.parse(raw);
        setUser(parsed);
      } catch (e) {
        console.error('Bad user JSON:', e);
      }
    })();
  }, [navigation]);

  /* ------------ handlers ------------ */
  const openEdit = () => {
    if (!user) return;
    setEditName(user.name);
    setEditEmail(user.email);
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!user) return;

    // 👉 replace with your real backend call
    await fetch(`https://your‑api.com/api/users/${user._id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: editName, email: editEmail}),
    });

    const newUser = {...user, name: editName, email: editEmail};
    await AsyncStorage.setItem('userData', JSON.stringify(newUser));
    setUser(newUser);
    setEditOpen(false);
  };

  const confirmDelete = () =>
    Alert.alert(
      'Delete account',
      'This action cannot be undone. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteAccount,
        },
      ],
    );

  const deleteAccount = async () => {
    if (!user) return;

    // 👉 replace with your real backend call
    await fetch(`https://your‑api.com/api/users/${user._id}`, {
      method: 'DELETE',
    });

    await AsyncStorage.multiRemove(['authToken', 'userData']);
    navigation.navigate('Login' as never);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['authToken', 'userData']);
    navigation.navigate('Login' as never);
  };

  /* ------------ helper render ------------ */
  const MenuButton = ({
    label,
    icon,
    onPress,
  }: {
    label: string;
    icon: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.menuBtn} onPress={onPress}>
      <Icon name={icon} size={18} color="#6d3aff" />
      <Text style={styles.menuText}>{label}</Text>
      <Icon name="angle-right" size={20} color="#ccc" style={{marginLeft:'auto'}} />
    </TouchableOpacity>
  );

  if (!user) return null; // or a loader

  /* ------------ screen render ------------ */
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Home' as never)}
        style={{marginLeft: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="arrow-left" size={22} color="#6d3aff" />
            <Text style={{marginLeft: 8, color: '#6d3aff', fontSize: 16}}>Back</Text>
            </TouchableOpacity>
      <FlatList
        data={[]}        /* only header+footer */
        keyExtractor={() => Math.random().toString()}
        renderItem={null}
        ListHeaderComponent={
          <>
            {/* header section */}
            <View style={styles.header}>
              <Image
                source={
                  user.avatar
                    ? {uri: user.avatar}
                    : require('../../assets/abstract/Abstract1.jpeg')  // add a placeholder image
                }
                style={styles.avatar}
              />
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>

            {/* menu items */}
            <MenuButton label="Edit profile" icon="pencil" onPress={openEdit} />
            <MenuButton
              label="Order history"
              icon="shopping-bag"
              onPress={() => navigation.navigate('Orders' as never)}
            />
            <MenuButton
              label="Wishlist"
              icon="heart"
              onPress={() => navigation.navigate('Wishlist' as never)}
            />
            <MenuButton label="Delete account" icon="trash" onPress={confirmDelete} />
            <MenuButton label="Logout" icon="sign-out" onPress={logout} />
          </>
        }
      />

      {/* ----- Edit modal ----- */}
      <Modal visible={editOpen} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit profile</Text>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditOpen(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveEdit}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

/* --------------- styles --------------- */
const ACCENT = '#6d3aff';
const RADIUS = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efff',
  },
  /* header (avatar area) */
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f5efff',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#d2a0ff',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  /* menu buttons */
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 18,
    marginVertical: 6,
    borderRadius: RADIUS,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 14,
    color: '#333',
  },
  /* modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: RADIUS,
    padding: 24,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: RADIUS / 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
    fontSize: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: '#999',
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: ACCENT,
    borderRadius: RADIUS / 2,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginLeft: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
  },
});

export default ProfileScreen;
