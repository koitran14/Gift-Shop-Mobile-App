import React, { useState, useEffect } from "react";
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
} from "react-native";
import { Colors, Fonts, Images } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios"; // Import axios
import { LinearGradient } from "expo-linear-gradient";

const CategoriesShop = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");

    const [categoryData, setCategoryData] = useState([]);

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    useEffect(() => {
        axios
            .get(
                "http://10.238.57.239:3000/store/categories?storeName=Example%20Store"
            )
            .then((response) => {
                setCategoryData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching category data:", error);
            });
    }, []);

    return (
        <LinearGradient
            colors={["rgba(231, 192, 248, 0.7)", "rgba(188, 204, 243, 0.7)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                {/* flex 0: hang tren cung */}
                <View style={styles.flex0}></View>

                {/* flex 1: hang shop */}
                <View style={styles.flex1}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        onPress={() => navigation.navigate("HomeScreen")}
                        style={{
                            top: -10,
                        }}
                    />

                    <Image style={styles.image3} source={Images.FLOWERBANNER} />

                    <View style={styles.subtractParent}>
                        <Image
                            style={styles.subtractIcon}
                            source={Images.SUB}
                        />

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
                                    value={searchText}
                                    onChangeText={setSearchText} //Update seach value
                                />
                            </View>
                        </View>

                        <View style={styles.container1}>
                            <Text style={[styles.sflower]}>SFlower</Text>
                            <Text style={[styles.follow]}>+ Follow</Text>
                            <Text
                                style={[
                                    styles.online2Minutes,
                                    styles.kFollowersTypo,
                                ]}
                            >{`Online 2 minutes ago `}</Text>
                            <Text
                                style={[
                                    styles.kFollowers,
                                    styles.kFollowersTypo,
                                ]}
                            >
                                4.9/5.0 | 33.7k Followers
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.vectorParent,
                                styles.parentShadowBox,
                            ]}
                        >
                            <Image
                                style={[
                                    styles.groupItem,
                                    styles.groupItemLayout,
                                ]}
                                resizeMode="cover"
                                source="Star 1.png"
                            />
                        </View>
                    </View>
                </View>

                {/* flex 2: description, hinh anh */}
                <View style={styles.flex2}>
                    <View style={styles.ngang}>
                        <View style={styles.rectangleView}>
                            <TouchableOpacity
                                onPress={() => navigateToScreen("ShopScreen")}
                            >
                                <Text>Shop</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigateToScreen("ProductShop")}
                            >
                                <Text>Product</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigateToScreen("CategoriesShop")
                                }
                            >
                                <Text>Categories</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* flex 3: san pham */}
                <View style={styles.flex3}>
                    <FlatList
                        data={categoryData}
                        renderItem={({ item }) => (
                            <View style={styles.gridItem}>
                                {/* Assuming you have an image URL for each category */}
                                <Text style={styles.productName}>
                                    {item.categoryName}
                                </Text>
                                <Text style={styles.productDescription}>
                                    {item.quantity}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        contentContainerStyle={styles.container2}
                        ListEmptyComponent={<Text>No categories found</Text>} // Display message when no categories are available
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    flex0: {
        flex: 0.05,
        //backgroundColor: "purple",
        flexDirection: "column",
        justifyContent: "flex-end", //make all content center
    },

    flex1: {
        flex: 0.2,
        flexDirection: "column",
        justifyContent: "space-around",
        //backgroundColor: "red",
    },
    searchInThe: {
        fontSize: 20,
        fontWeight: "700",
        color: "rgba(0, 0, 0, 0.45)",
        textAlign: "left",
        width: "100%",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: {
            width: 0,
            height: 4,
        },
        textShadowRadius: 100,
    },
    searchContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: "25%",
        width: "140%",
        borderRadius: 8,
        marginLeft: "15%",
        marginRight: "10%",
        flexDirection: "row",
    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "3%",
    },

    searchText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: "5%",
    },
    container1: {
        top: "10%",
    },
    sflower: {
        color: "#e07ce9",
        fontWeight: "700",
        fontSize: 25,
        left: "40%",
    },

    follow: {
        borderStyle: "solid",
        borderColor: "#fe3c3c",
        borderWidth: 1,
        left: "120%",
        fontSize: 22,
        lineHeight: 25,
        fontWeight: "700",
        color: "rgba(206, 84, 84, 0.8)",
        textAlign: "center",
        alignItems: "center",
        width: 109,
        height: 25,
    },

    subtractParent: {
        position: "absolute",
        top: "10%",
    },

    image3: {
        height: "100%",
        width: "100%",
        opacity: 0.99,
    },

    subtractIcon: {
        height: 40,
        width: 40,
        top: "45%",
        left: "18%",
        position: "absolute",
    },

    online2Minutes: {
        top: -30,
        left: "40%",
    },

    kFollowers: {
        top: -30,
        left: "40%",
    },

    flex2: {
        //backgroundColor: "blue",
        flex: 0.06,
        flexDirection: "column",
        justifyContent: "space-between",
    },

    rectangleView: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {},
        shadowRadius: 4,
        shadowOpacity: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: 40,
        opacity: 0.7,
    },

    flex3: {
        // backgroundColor: "green",
        flex: 0.8,
        flexDirection: "column",
    },

    container3: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "2%",
        width: "100%",
    },
    choice: {
        padding: "4%",
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
    },

    text: {
        color: "purple",
    },

    selectedText: {
        color: "white",
        fontWeight: "400",
    },

    selectedChoice: {
        backgroundColor: "purple",
    },

    rectangleView1: {
        flex: 0.2,
        flexDirection: "row",

        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
        borderRadius: 4,
        backgroundColor: "#fff",

        width: "100%",
        height: 68,
    },
    container2: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        justifyContent: "space-evenly",
        top: "5%",
    },

    productContainer: {
        backgroundColor: "#fffdfd",
        width: "40%",
        borderRadius: 40,
        borderColor: "white",
        padding: "5%",
        margin: "5%",
    },
    image: {
        width: "100%",
        height: 100,
        marginBottom: "5%",
    },

    name: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    price: {
        fontSize: 14,
        textAlign: "center",
    },

    description: {
        color: "purple",
        textAlign: "center",
    },

    flowers: {
        marginTop: "10%",
        alignItems: "flex-end",
        fontWeight: "700",
    },

    image7Icon: {
        marginLeft: "8%",
        marginTop: "5%",
    },
});

export default CategoriesShop;
