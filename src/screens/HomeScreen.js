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

                    <View style={styles.specialDaySection}>
                        {/* special day */}
                        <Text style={styles.specialDayTitle}>Special Day</Text>
                        <ScrollView
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
                        </ScrollView>
                    </View>
                </View>
            </View>

            {/* flex2 */}
            <View style={styles.flex2}>
                {/* <ScrollView style={styles.listContainer}> */}
                    <ScrollView   style={styles.horizontalListContainer}>
                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderTitle}>
                                Categories
                            </Text>
                            <Text style={styles.listHeaderSubtitle}>
                                See All
                            </Text>
                        </View>
                        <FlatList
                            data={restaurants}
                            keyExtractor={(item) => item?.id}
                            horizontal
                            ListHeaderComponent={() => <Separator width={20} />}
                            ListFooterComponent={() => <Separator width={20} />}
                            ItemSeparatorComponent={() => (
                                <Separator width={10} />
                            )}
                            renderItem={({ item }) => (
                                <RestaurantCard
                                    {...item}
                                    navigate={(restaurantId) =>
                                        navigation.navigate("Restaurant", {
                                            restaurantId,
                                        })
                                    }
                                />
                            )}
                        />
                    
                    <View style={styles.sortListContainer}>
                        <TouchableOpacity
                            style={sortStyle(activeSortItem === "recent")}
                            activeOpacity={0.8}
                            onPress={() => setActiveSortItem("recent")}
                        >
                            <Text style={styles.sortListItemText}>Recent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={sortStyle(activeSortItem === "favorite")}
                            activeOpacity={0.8}
                            onPress={() => setActiveSortItem("favorite")}
                        >
                            <Text style={styles.sortListItemText}>
                                Favorite
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={sortStyle(activeSortItem === "rating")}
                            activeOpacity={0.8}
                            onPress={() => setActiveSortItem("rating")}
                        >
                            <Text style={styles.sortListItemText}>Flowers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={sortStyle(activeSortItem === "popular")}
                            activeOpacity={0.8}
                            onPress={() => setActiveSortItem("popular")}
                        >
                            <Text style={styles.sortListItemText}>Gifts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={sortStyle(activeSortItem === "trending")}
                            activeOpacity={0.8}
                            onPress={() => setActiveSortItem("trending")}
                        >
                            <Text style={styles.sortListItemText}>Cakes</Text>
                        </TouchableOpacity>
                    </View>
                    {restaurants?.map((item) => (
                        <RestaurantMediumCard {...item} key={item?.id} />
                    ))}
                    </ScrollView>
                {/* </ScrollView> */}
            </View>

            <View style={styles.flex3}>
           
                <View style={styles.rectangleView}>
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
                </View>
            </View>

            <View style={styles.flex4}> 
            <Image source={Images.HOME}  />
            <Image source={Images.LOVE}  />
            <Image source={Images.USER}  />
            <Image source={Images.CART}  />
            


            </View>


        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },

    // flex1
  
    headerContainer: {
        justifyContent: "space-evenly",
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
    },
    locationText: {
        color: Colors.DEFAULT_BLACK,
        marginLeft: 5,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    selectedLocationText: {
        color: Colors.DEFAULT_YELLOW,
        marginLeft: 5,
        fontSize: 14,
        lineHeight: 14 * 1.4,
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
        height: 45,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    searchText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 10,
    },
    categoriesContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: Colors.DEFAULT_BLACK,
        marginTop: 30,
    },


    // flex2
   
    listHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 5,
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
    sortListContainer: {
        backgroundColor: 'linear-gradient(90deg, rgba(210, 192, 248, 0.70) 0%, rgba(188, 204, 243, 0.70) 100%)',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 8,
        elevation: 1,
    },
    sortListItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: Colors.DEFAULT_YELLOW,
        height: 40,
    },
    sortListItemText: {
        color: 'purple',
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        fontWeight: "700",
    },

    // flex 3
    
    rectangleView: {
        borderRadius: 30,
        backgroundColor: "#fffdfd",
        width: "30%",
        height: "70%",
        color: Colors.DEFAULT_BLACK,
        alightItems: "center",
        justifyContent: "center",
    },

    flower: {
        width: "100%",
        height: "50%",
    },

    flower_text1: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
        lineHeight: 28,
    },

    flower_text2: {
        fontSize: 12,
        textAlign: "center",
    },

    flower_text3: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700",
        lineHeight: 25,
        color: "#b505e1",
    },

    specialDayTitle: {
        textDecorationLine: 'underline',
        fontSize: 16,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
        marginLeft: 20, // Hoặc một giá trị phù hợp để căn lề trái
        marginBottom: 5, // Khoảng cách giữa tiêu đề và ScrollView
    },
    
    specialDaySection: {
        marginTop: 12,
    },

    flex1: {
        flex: 0.4,
        //backgroundColor: "red",
        flexDirection: "column",
        justifyContent: "flex-end", 
    },

    flex2: {
        //backgroundColor: "blue",
        flex: 0.15,
        flexDirection: "column",
        justifyContent: "flex-end", 

    },

    flex3: {
        //backgroundColor: "green",
        flex: 0.4,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    flex4: {
        backgroundColor: 'linear-gradient(90deg, rgba(231, 192, 248, 0.70) 0%, rgba(188, 204, 243, 0.70) 100%)',
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});

export default HomeScreen;
