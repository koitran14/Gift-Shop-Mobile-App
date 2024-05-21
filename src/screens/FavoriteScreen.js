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
import { ProductCard } from '../components';
import Cookies from 'js-cookie';

const FavoriteScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('heart');
  const [selectedMenu, setSelectedMenu] = useState('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = Cookies.get('AccessToken');
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const productResponse = await axios.get('http://localhost:3000/product', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProducts(productResponse.data);

        const shopResponse = await axios.get('http://localhost:3000/store', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setShops(shopResponse.data);

        const userResponse = await axios.get('http://localhost:3000/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserInfo(userResponse.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

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

  const goToProduct = (product) => {
    // navigation.navigate(product.navigateTo, { ProductCard });

  //   renderItem={({ item }) => (
  //     <ProductCard product={item} onPress={() => onPress(item)} />
  // )}
  };

  const viewShop = (shopId) => {
    // console.log("View shop", shopId);
  };

  if (loading) {
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
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      <View style={styles.profileDetails}>
        <Image source={Images.USER} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{userInfo.username}</Text>
          <Text style={styles.details}>{userInfo.email}</Text>
          <Text style={styles.details}>Location</Text>
        </View>
      </View>

      <View style={styles.contentContainer2}>
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

        <View style={styles.newMenu}>
          <TouchableOpacity
            style={[styles.menuItem, selectedMenu === 'products' ? styles.selectedMenuItem : null]}
            onPress={() => handleMenuSelect('products')}
          >
            <Text style={selectedMenu === 'products' ? styles.selectedMenuText : styles.menuText}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, selectedMenu === 'shops' ? styles.selectedMenuItem : null]}
            onPress={() => handleMenuSelect('shops')}
          >
            <Text style={selectedMenu === 'shops' ? styles.selectedMenuText : styles.menuText}>Shops</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {selectedMenu === 'products' ? (
          <View style={styles.productRow}>
            {products.map((product) => (
              <View key={product._id} style={styles.productCard}>
                <Image source={{ uri: product.productImage }} style={styles.productImage} />
                <Text style={styles.productName}>{product.productName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
                <Text style={styles.productDescription}>{product.productDescription}</Text>
                <TouchableOpacity style={styles.button} onPress={() => goToProduct(product)}>
                  <Text style={styles.buttonText}>Go to</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          shops.map((shop) => (
            <View key={shop._id} style={styles.shopContainer}>
              <Image source={{ uri: shop.products[0].productImage }} style={styles.shopAvatar} />
              <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{shop.storeName}</Text>
                <Text style={styles.shopDescription}>{shop.storeDescription}</Text>
                <Text style={styles.shopFollowers}>{shop.followers.length} Followers</Text>
              </View>
              <TouchableOpacity style={styles.viewButton} onPress={() => viewShop(shop._id)}>
                <Text style={styles.viewButtonText}>View Shop</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  icon: (selected) => ({
    backgroundColor: selected ? 'rgba(138, 43, 226, 0.2)' : 'transparent',
    padding: 10,
    borderRadius: 10,
  }),

  contentContainer2: {
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
    marginTop: 20,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(180, 160, 220, 0.9)',
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  newMenu: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    marginTop: 0,
    paddingBottom: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 0.5,
  },
  selectedMenuItem: {
    borderTopColor: 'gray',
    borderBottomWidth: 0,
  },
  menuText: {
    color: 'gray',
  },
  selectedMenuText: {
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productCard: {
    width: '44%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productPrice: {
    fontSize: 16,
    color: '#555'
  },
  productDescription: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  shopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  shopAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  shopInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  shopName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF1493',
  },
  shopDescription: {
    fontSize: 14,
    color: 'gray',
  },
  shopFollowers: {
    fontSize: 14,
    color: 'gray',
  },
  viewButton: {
    backgroundColor: '#B0E0E6',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default FavoriteScreen;
