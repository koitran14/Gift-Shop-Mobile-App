import React, { useState, useEffect } from "react";
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Colors, Fonts, Images } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const Shop = ({ navigation }) => {
    const products = [
        {
            id: 1,
            name: "Gifts",
            price: "$10",
            description: "A beautiful gift",
            image: require("../../assets/images/gift.png"),
        },
        {
            id: 2,
            name: "Cake",
            price: "$20",
            description: "A delicious cake",
            image: require("../../assets/images/cake.png"),
        },
        {
            id: 3,
            name: "Product 3",
            price: "$30",
            description: "Description 3",
            image: require("../../assets/images/star.png"),
        },
        {
            id: 4,
            name: "Product 3",
            price: "$30",
            description: "Description 3",
            image: require("../../assets/images/flower.png"),
        },
    ];

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const filtered = products.filter((product) => {
            return (
                product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
        });
        setFilteredProducts(filtered);
    }, [searchText]);

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
                        <Text style={[styles.follow]}>
                            + Follow
                        </Text>
                        <Text
                            style={[
                                styles.online2Minutes,
                                styles.kFollowersTypo,
                            ]}
                        >{`Online 2 minutes ago `}</Text>
                        <Text
                            style={[styles.kFollowers, styles.kFollowersTypo]}
                        >
                            4.9/5.0 | 33.7k Followers
                        </Text>
                    </View>
                    <View style={[styles.vectorParent, styles.parentShadowBox]}>
                        <Image
                            style={[styles.groupItem, styles.groupItemLayout]}
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
                            <Text>Shop</Text>
                            <Text>Product</Text>
                            <Text>Categories</Text>
                        </View>
                    </View>

                    <Text
                        style={[styles.welcomeToSoap]}
                    >{`Welcome to Soap Flower Official Shop! We specialize in a wide variety of gift items, including wax flowers, wool flowers, and gift boxes, all at affordable prices with top-quality.
We're a Vietnamese brand offering nationwide delivery.
Open hours: 8 AM - 8 PM
FB: SFlower`}</Text>
                    <Image style={styles.image2Icon} source={Images.FLOWER1} />
                </View>

                {/* flex 3: san pham */}
                <View style={styles.flex3}>
                    <Text style={[styles.hotList, styles.hotListClr]}>
                        HOT LIST
                    </Text>

                    <ScrollView contentContainerStyle={styles.container2}>
                        {filteredProducts.map((product) => (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.productContainer}
                            >
                                <Image
                                    source={product.image}
                                    style={styles.image}
                                />
                                <Text style={styles.name}>{product.name}</Text>
                                <Text style={styles.price}>
                                    {product.price}
                                </Text>
                                <Text style={styles.description}>
                                    {product.description}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
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
        justifyContent: 'space-around',
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
        flex: 0.55,
        
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

    image2Icon: {
        height: "50%",
        width: "100%",
        opacity: 0.99,
        top: -20,
    },

    flex3: {
        //backgroundColor: "green",
        flex: 0.25,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    hotList: {
        borderRadius: 20,
        backgroundColor: "rgba(149, 16, 183, 0.48)",
        fontSize: 14,
        fontWeight: "800",
        color: "#000",
        top: "10%",
        justifyContent: "center",
        alignItems: "center",
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
});

export default Shop;
