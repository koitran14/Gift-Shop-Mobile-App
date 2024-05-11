import React, { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
    TouchableWithoutFeedback,
} from "react-native";

const FavoriteScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({
        name: "Mary Johnson",
        username: "Mary",
        gender: "Female",
        birthday: "January 1, 1990",
        phone: "123-456-7890",
        email: "mary@example.com",
        location: "Los Angeles",
        cards: [
            { type: "VISA Credit Card", number: "XXXX-XXXX-XXXX-1123", image: Images.VISA },
            { type: "MasterCard", number: "XXXX-XXXX-XXXX-5100", image: Images.MASTERCARD }
        ],
        socialLinks: [
            { platform: "Facebook", linked: false, image: Images.FACEBOOK },
            { platform: "Google", linked: true, image: Images.GOOGLE }
        ],
        facebookLinked: false,
        googleLinked: true,
    });
    const [selectedIcon, setSelectedIcon] = useState('heart'); // Tracks which icon is selected
    const [selectedMenu, setSelectedMenu] = useState('products'); // Mặc định chọn 'products'

    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
    };

    const handleIconPress = (iconName) => {
        setSelectedIcon(iconName); // Cập nhật biểu tượng được chọn

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

    //PRODUCTS DATA
    const [products, setProducts] = useState([
        { id: 1, name: 'Gifts', price: '$10', description: 'A beautiful gift', image: Images.GIFT },
        { id: 2, name: 'Cake', price: '$20', description: 'A delicious cake', image: Images.CAKE },
        { id: 3, name: 'Star Product', price: '$30', description: 'A shiny star', image: Images.STAR, navigateTo: 'ProductDetail' },
        { id: 4, name: 'Flower', price: '$15', description: 'Fresh flowers', image: Images.FLOWER, navigateTo: 'ProductDetail' },
    ]);

    //SHOPS DATA
    const [shops, setShops] = useState([
        { id: 1, name: "SFlower", city: "Ho Chi Minh City", avatar: Images.USER },
        { id: 2, name: "SFlower2", city: "Ho Chi Minh City", avatar: Images.USER },
        { id: 3, name: "SFlower3", city: "Ho Chi Minh City", avatar: Images.USER },
        { id: 4, name: "SFlower4", city: "Ho Chi Minh City", avatar: Images.USER },

    ]);


    // When click con product
    const goToProduct = (product) => {
        // navigation.navigate(product.navigateTo, { product });
    };
    
    //When click on View shop
    const viewShop = (shopId) => {
        // console.log("View shop", shopId);
    };





    return (
        <LinearGradient
            colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Favourite</Text>
            </View>

            {/* Profile Details */}
            <View style={styles.profileDetails}>
                <Image source={Images.USER} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>{userInfo.username}</Text>
                    <Text style={styles.details}>{userInfo.gender}</Text>
                    <Text style={styles.details}>{userInfo.location}</Text>
                </View>
            </View>


            <View style={styles.contentContainer2}>
                {/* Menu Icons */}
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

                {/* New Menu */}
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



            {/* Content */}
            <ScrollView style={styles.content}>
                {selectedMenu === 'products' ? (
                    <View style={styles.productRow}>
                        {products.map((product, index) => (
                            <View key={product.id} style={styles.productCard}>
                                <Image source={product.image} style={styles.productImage} />
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productPrice}>{product.price}</Text>
                                <Text style={styles.productDescription}>{product.description}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => goToProduct(product)}>
                                    <Text style={styles.buttonText}>Go to</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    shops.map((shop) => (
                        <View key={shop.id} style={styles.shopContainer}>
                            <Image source={shop.avatar} style={styles.shopAvatar} />
                            <View style={styles.shopInfo}>
                                <Text style={styles.shopName}>{shop.name}</Text>
                                <View style={styles.locationContainer}>
                                    <Ionicons name="location-outline" size={16} color="gray" />
                                    <Text style={styles.shopCity}>{shop.city}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.viewButton} onPress={() => viewShop(shop.id)}>
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

    contentContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        // flex: 1,
        flexDirection: 'row',
        paddingVertical: 50,
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
        padding: 25,
        marginHorizontal: 20,
        marginTop: 10,
        borderWidth: 2, // Thêm viền
        borderColor: '#CCC',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,

    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3, // Thêm viền cho avatar
        borderColor: '#BBB', // Màu viền
        elevation: 6, // Đổ bóng 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,

    },
    name: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 5,
        paddingLeft: 10,
    },
    details: {
        color: "gray",
        fontSize: 16,
        paddingLeft: 10,
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
        // borderColor: 'gray', // Màu viền khi không được chọn
        // borderBottomWidth: 0.5,
        borderTopWidth: 0.5,

    },
    selectedMenuItem: {
        borderTopColor: 'gray', // Màu viền khi được chọn
        borderBottomWidth: 0,
    },
    menuText: {
        color: 'gray', // Màu chữ khi không được chọn
    },
    selectedMenuText: {
        color: 'black', // Màu chữ khi được chọn
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
        // color: 'deeppink',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shopCity: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 5,
    },
    viewButton: {
        backgroundColor: '#B0E0E6', // Light blue color
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        // alignSelf: 'flex-start',
    },
    viewButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },



});

export default FavoriteScreen;