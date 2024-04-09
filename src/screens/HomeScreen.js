import React, { useState, useEffect } from "react";
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
    TouchableWithoutFeedback
} from "react-native";
import {
    CategoryMenuItem,
    RestaurantCard,
    RestaurantMediumCard,
    Separator,
} from "../components";
import { Colors, Fonts, Mock, Images } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { RestaurantService } from "../services";
import { Display } from "../utils";
import { LinearGradient } from 'expo-linear-gradient';

const sortStyle = (isActive) =>
    isActive
        ? styles.sortListItem
        : { ...styles.sortListItem, borderBottomColor: Colors.DEFAULT_WHITE };

const HomeScreen = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState();
    const [restaurants, setRestaurants] = useState(mockRestaurants); // set fake data
    const [activeSortItem, setActiveSortItem] = useState("recent");

    //fake data
    const mockRestaurants = [
        {
            id: "1",
            name: "Restaurant A",
            description: "Delicious food at affordable prices.",
            rating: 4.5,
            imageUrl:
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F62%2FBarbieri_-_ViaSophia25668.jpg%2F640px-Barbieri_-_ViaSophia25668.jpg&tbnid=cTtqtZLwD_SHiM&vet=12ahUKEwj-7Jv6mJyFAxVioa8BHW3BC-8QMygAegQIARBy..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FRestaurant&docid=GJpv6Vju4A3OkM&w=640&h=552&q=restaurant&ved=2ahUKEwj-7Jv6mJyFAxVioa8BHW3BC-8QMygAegQIARBy",
            category: "Italian",
        },
        {
            id: "2",
            name: "Restaurant B",
            description: "Authentic cuisine from around the world.",
            rating: 4.2,
            imageUrl:
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F62%2FBarbieri_-_ViaSophia25668.jpg%2F640px-Barbieri_-_ViaSophia25668.jpg&tbnid=cTtqtZLwD_SHiM&vet=12ahUKEwj-7Jv6mJyFAxVioa8BHW3BC-8QMygAegQIARBy..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FRestaurant&docid=GJpv6Vju4A3OkM&w=640&h=552&q=restaurant&ved=2ahUKEwj-7Jv6mJyFAxVioa8BHW3BC-8QMygAegQIARBy",
            category: "Asian",
        },
        {
            id: "3",
            name: "Restaurant C",
            description: "Healthy and organic dishes for everyone.",
            rating: 4.8,
            imageUrl:
                "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F62%2FBarbieri_-_ViaSophia25668.jpg%2F640px-Barbieri_-_ViaSophia25668.jpg&tbnid=cTtqtZLwD_SHiM&vet=12ahUKEwj-7Jv6mJyFAxVioa8BHW3BC-8QMygAegQIARBy..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FRestaurant&docid=GJpv6Vju4A3OkM&w=640&h=552&q=restaurant&ved=2ahUKEwj-7Jv6mJyFAxVioa8BHW3BC-8QMygAegQIARBy",
            category: "Vegetarian",
        },
        // Add more mock restaurants as needed
    ];

    // useEffect(() => {
    //   const unsubscribe = navigation.addListener('focus', () => {
    //     RestaurantService.getRestaurants().then(response => {
    //       if (response?.status) {
    //         setRestaurants(response?.data);
    //       }
    //     });
    //   });
    //   return unsubscribe;
    // }, []);

    //products
    const products = [
        { id: 1, name: 'Gifts', price: '$10', description: 'A beautiful gift', image: require('../../assets/images/gift.png') },
        { id: 2, name: 'Cake', price: '$20', description: 'A delicious cake', image: require('../../assets/images/cake.png') },
        { id: 3, name: 'Product 3', price: '$30', description: 'Description 3', image: require('../../assets/images/star.png') },
        { id:4, name: 'Product 3', price: '$30', description: 'Description 3', image: require('../../assets/images/flower.png') },   
    ];
    
    // Recent bar
    const [selectedChoice, setSelectedChoice] = useState('Recent');

    const choices = ['Recent', 'Favorite', 'Flowers', 'Gifts', 'Cakes'];

    const handleChoiceSelect = (choice) => {
        setSelectedChoice(choice);  
    };

    //special day
    const specialDays = [
        { date: '14/2', image: require('../../assets/images/83.png') },
        { date: '8/3', image: require('../../assets/images/142.png') },
        { date: '20/11', image: require('../../assets/images/2011.png') },
        { date: '14/2', image: require('../../assets/images/83.png') },
    ];
    
    const handleImagePress = (date) => {
        if (date === '14/2') {
          navigation.navigate('HomeScreen');
        }
    };

    const navigators = [
        {
            navigation: 'HomeScreen',
            source: Images.HOME,
        },
        {
            navigation: 'FavoriteScreen',
            source: Images.LOVE,
        },
        {
            navigation: 'ProfileScreen',
            source: Images.USER,
        },
        {
            navigation: 'CartScreen',
            source: Images.CART,
        }
    ]

    return (
        <LinearGradient
            colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>

                {/* flex1 */}
                <View style={styles.flex1}> 
                    <View style={styles.headerContainer}>
                        <View style={styles.locationContainer}>
                            {/* Welcome  */}
                            <Image source={Images.USER}  />

                            <Text style={styles.locationText}>
                                Welcome Koi Tran
                            </Text>
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={16}
                                color={Colors.DEFAULT_YELLOW}
                            />
                            <Feather
                                name="bell"
                                size={24}
                                color={Colors.DEFAULT_WHITE}
                                style={{ position: "absolute", right: 0 }}
                            />
                            <View style={styles.alertBadge}>
                                <Text style={styles.alertBadgeText}>12</Text>
                            </View>
                        </View>

                        <View style={styles.searchContainer}>
                            {/* search bar */}
                            <View style={styles.searchSection}>
                                <Ionicons
                                    name="search-outline"
                                    size={25}
                                    color={Colors.DEFAULT_GREY}
                                />
                                <TextInput
                                    style={styles.searchText}
                                    placeholder="Search..."
                                />
                            </View>
                            <Feather
                                name="sliders"
                                size={20}
                                color={Colors.DEFAULT_YELLOW}
                                style={{ marginRight: 10 }}
                            />
                        </View>

                        {/* special day */}
                        <View style={styles.specialDaySection}>
                            <Text style={styles.specialDayTitle}>Special Day</Text>
                            {/* <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {Mock.CATEGORIES.map(({ name, logo }) => (
                                    <CategoryMenuItem
                                        key={name}
                                        name={name}
                                        logo={logo}
                                        activeCategory={activeCategory}
                                        setActiveCategory={setActiveCategory}
                                        special={
                                            name === "14-2" ||
                                            name === "8-3" ||
                                            name === "1-4" ||
                                            name === "1-5" ||
                                            name === "20-10" ||
                                            name === "20-11"
                                        }
                                        backgroundColor={
                                            Colors[
                                                `SPECIAL_DATE_${name.replace(
                                                    "-",
                                                    "_"
                                                )}`
                                            ]
                                        }
                                    />
                                ))}
                            </ScrollView> old*/}
                            
                            <ScrollView 
                                horizontal 
                                contentContainerStyle={{ flexDirection: 'row' }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {specialDays.map(({ date, image }, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleImagePress(date)}>
                                        <View style={{ marginHorizontal: 10 }}>
                                            <Image
                                                source={image}
                                                style={{ width: 120, height: 80, borderRadius: 10 }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>

                {/* flex2 */}
                <View style={styles.flex2}>
                    <View style={styles.horizontalListContainer}>
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderTitle}>
                                Categories
                            </Text>
                            <Text style={styles.listHeaderSubtitle}>
                                See All
                            </Text>
                        </View>

                        <ScrollView 
                            horizontal 
                            contentContainerStyle={styles.container3}
                            showsHorizontalScrollIndicator={false}
                        >
                            {choices.map((choice, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.choice, selectedChoice === choice ? styles.selectedChoice : null]}
                                    onPress={() => handleChoiceSelect(choice)}
                                >
                                    <Text style={selectedChoice === choice ? styles.selectedText : styles.text}>{choice}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* flex3 */}
                
                <View style={styles.flex3}>
            
                    {/* <View style={styles.rectangleView}>
                        <Image source={Images.FLOWER} style={styles.flower} />
                        <Text style={styles.flower_text1}>Bouquet</Text>
                        <Text style={styles.flower_text2}>Having 5 flower</Text>
                        <Text style={styles.flower_text3}>$20</Text>
                    </View>

                    <View style={styles.rectangleView}>
                        <Image source={Images.FLOWER} style={styles.flower} />
                        <Text style={styles.flower_text1}>Bouquet</Text>
                        <Text style={styles.flower_text2}>Having 5 flower</Text>
                        <Text style={styles.flower_text3}>$20</Text>
                        </View> */}
                        
                    <ScrollView contentContainerStyle={styles.container2}>
                        {products.map((product) => (
                            <TouchableOpacity key={product.id} style={styles.productContainer}>
                                <Image source={product.image} style={styles.image} />
                                <Text style={styles.name}>{product.name}</Text>
                                <Text style={styles.price}>{product.price}</Text>
                                <Text style={styles.description}>{product.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* flex4 */}

                <View style={styles.flex4}>
                    {navigators.map((nav, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(nav.navigation)}>
                            <Image source={nav.source} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* <View style={styles.flex4}> 
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}> 
                        <Image source={Images.HOME} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')}>
                        <Image source={Images.LOVE}  />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>  
                        <Image source={Images.USER}  />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>  
                        <Image source={Images.CART}  />
                    </TouchableOpacity>
                </View> */}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },

    // flex1
  
    headerContainer: {
        justifyContent: "space-evenly",
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: '12%',
        marginHorizontal: "5%",
    },
    locationText: {
        color: Colors.DEFAULT_BLACK,
        marginLeft: '2%',
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    alertBadge: {
        borderRadius: 32,
        backgroundColor: Colors.DEFAULT_YELLOW,
        justifyContent: "center",
        alignItems: "center",
        height: 16,
        width: 16,
        position: "absolute",
        right: -2,
        top: -10,
    },
    alertBadgeText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
    },
    searchContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: "19%",
        borderRadius: 8,
        marginHorizontal: "5%",
        marginTop: "5%",
        marginBottom: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: '3%',
    },
    searchText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: '5%',
    },
   
    specialDayTitle: {
        textDecorationLine: 'underline',
        fontSize: 16,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
        marginLeft: '5%', // Hoặc một giá trị phù hợp để căn lề trái
        marginBottom: '2%', // Khoảng cách giữa tiêu đề và ScrollView
    },

    // flex2
   
    listHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: "5%",
    },

    listHeaderTitle: {
        textDecorationLine: 'underline',
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    listHeaderSubtitle: {
        color: Colors.DEFAULT_YELLOW,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },

    container3: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '2%',
        width: '100%',
    },
    choice: {
        padding: "4%",
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
    },

    text: {
        color: 'purple',
    },

    selectedText: {
        color: 'white',
        fontWeight: '400',
    },

    selectedChoice: {
        backgroundColor: 'purple',
    },

    // flex 3
    
    container2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        justifyContent: "space-evenly",
    },

    productContainer: {
        backgroundColor: "#fffdfd",
        width: '40%',
        borderRadius: 40,
        borderColor: 'white',
        padding: "5%",
        margin: "5%",
    },
    image: {
        width: '100%',
        height: 100,
        marginBottom: "5%",
    },
      
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: "center",
    },
    price: {
        fontSize: 14,
        textAlign: "center",
    },
      
    description: {
        color: 'purple',
        textAlign: "center",
    },

    flex1: {
        flex: 0.35,
        //backgroundColor: "red",
        flexDirection: "column",
        justifyContent: "flex-end", //make all content center
    },

    flex2: {
        //backgroundColor: "blue",
        flex: 0.15,
        width: '100%',
        flexDirection: "column", 
        justifyContent: "center", 
    },

    flex3: {
        //backgroundColor: "green",
        flex: 0.43,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    flex4: {
        backgroundColor: 'linear-gradient(90deg, rgba(231, 192, 248, 1) 0%, rgba(188, 204, 243, 0.70) 100%)',
        height: 60,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    //bar recent
});

export default HomeScreen;
