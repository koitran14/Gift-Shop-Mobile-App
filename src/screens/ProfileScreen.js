import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Images } from "../contants";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('person');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          return "No token found";
        }
        const response = await axios.get('http://192.168.0.103:3000/user', {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGI4NTE3NzBlYjAwNDJjMTdlM2E0OCIsImlhdCI6MTcxNjI3NzMyOCwiZXhwIjoxNzE2MjgwOTI4fQ.XNBXJz66f8sCGn4U5V31R8TQJzs88BE7eZsrYwf_w0g`
          }
        });
        setUserInfo(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
    switch (iconName) {
      case 'person':
        navigation.navigate('ProfileScreen');
        break;
      case 'heart':
        navigation.navigate('FavoriteScreen');
        break;
      case 'cube':
        break;
      case 'clipboard':
        break;
      default:
        break;
    }
  };

  if (!userInfo) {
    return <ActivityIndicator size="large" color={Colors.PRIMARY} />;
  }

  return (
    <LinearGradient
      colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileDetails}>
        <Image source={Images.USER} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{userInfo.username}</Text>
          <Text style={styles.details}>{userInfo.email}</Text>
          <Text style={styles.details}>Location</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Username: </Text>{userInfo.username}</Text>
          <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Email: </Text>{userInfo.email}</Text>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={() => { }}>
          <Text style={styles.actionText}>Change Password</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Link Social Account</Text>
        <View style={styles.socialLinkItem}>
          <Image source={Images.FACEBOOK} style={styles.socialIcon} />
          <Text>Facebook: Not signed in</Text>
        </View>
        <View style={styles.socialLinkItem}>
          <Image source={Images.GOOGLE} style={styles.socialIcon} />
          <Text>Google: Signed in as {userInfo.username}</Text>
        </View>
      </ScrollView>

      <View style={styles.menuIcons}>
        <TouchableOpacity onPress={() => handleIconPress('person')} style={styles.icon(selectedIcon === 'person')}>
          <Ionicons name="person-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('heart')} style={styles.icon(selectedIcon === 'heart')}>
          <Ionicons name="heart-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('cube')} style={styles.icon(selectedIcon === 'cube')}>
          <Ionicons name="cube-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('clipboard')} style={styles.icon(selectedIcon === 'clipboard')}>
          <Ionicons name="clipboard-outline" size={30} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  icon: (selected) => ({
    backgroundColor: selected ? 'rgba(138, 43, 226, 0.2)' : 'transparent',
    padding: 10,
    borderRadius: 10,
  }),

  contentContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#BBB',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  details: {
    color: "gray",
    fontSize: 16,
  },
  menuIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(180, 160, 220, 0.9)',
    paddingVertical: 10,
    backgroundColor: "white",
  },
  userInfo: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingBottom: 10,
  },
  actionButton: {
    backgroundColor: "#87CEEB",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  socialLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
