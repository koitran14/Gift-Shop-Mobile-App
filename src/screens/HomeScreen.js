import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import {
    ProductCard,
} from "../components";
import { Colors, Fonts, Images } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { CategoryService, ProductService, SpecialDayService } from "../services";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState('Recent');
    const [searchText, setSearchText] = useState(""); // State lưu từ khóa tìm kiếm
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [specialDays, setSpecialDays] = useState([]);

    const navigators = [
        {
            navigation: 'HomeScreen',
            source: Images.HOME,
        },
        {
            navigation: 'ProfileScreen',
            source: Images.LOVE,
        },
        {
            navigation: 'ProductShop',
            source: Images.USER,
        },
        {
            navigation: 'CategoriesShop',
            source: Images.CART,
        }
    ]

    useEffect(() => {
        const getProducts = async() => {
            const products = await ProductService.getAllProducts();
            setProducts(products);
            activeCategory === 'Recent' && setFilteredProducts(products);
        }

        const getCategories = async() => {
            const categories = await CategoryService.getAllCategories();
            setCategories(categories);
        }

        const getSpecialDays = async() => {
            const specialDays = await SpecialDayService.getAllSpecialDay();
            console.log(specialDays)
            setSpecialDays(specialDays);
        }

        getProducts();
        getCategories();
        getSpecialDays();
    }, [])
                                                                     
    const handleSearchSubmit = () => {
        const filtered = products?.filter((product) => {
            return product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
                   product.productDescription.toLowerCase().includes(searchText.toLowerCase());
        });
        searchText && navigation.navigate("SearchScreen", { searchResults: filtered });
    }

    const onPress = (product) => {
        navigation.navigate('ProductScreen', { product: product });
    }

    const selectCategory = (choice) => {
        setActiveCategory(choice);  
        const filtered = filteredProducts?.filter((product) => {
            return product.category.categoryName.toLowerCase().includes(choice.toLowerCase())
        });
        setFilteredProducts(choice === 'Recent' ? products : filtered);
    };

    const handleFilterBySpecialDay = (specialDay) => {
        const filtered = filteredProducts.filter(product => {
            return product.properties.some(productProp => {
                return specialDay.properties.some(specialProp => {
                    return productProp.typeOfProperties.toLowerCase() === specialProp.typeOfProperties.toLowerCase();
                });
            });
        });
        setFilteredProducts(filtered);
    };
    
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
                            <Image source={Images.USER} />

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
                                    value={searchText}
                                    onChangeText={setSearchText} //Update seach value
                                    onSubmitEditing={handleSearchSubmit}
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
                            <ScrollView 
                                horizontal 
                                contentContainerStyle={{ flexDirection: 'row' }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {specialDays.map((date, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleFilterBySpecialDay(date)}>
                                        <View style={{ marginHorizontal: 10 }}>
                                            <Image
                                                source={{uri: date.dateImage}}
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
                            <TouchableOpacity
                                style={[styles.choice, activeCategory === 'Recent' ? styles.selectedChoice : null]}
                                onPress={() => selectCategory('Recent')}
                            >
                                <Text style={activeCategory === 'Recent' ? styles.selectedText : styles.text}>Recent</Text>
                            </TouchableOpacity>
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.choice, activeCategory === category.categoryName ? styles.selectedChoice : null]}
                                    onPress={() => selectCategory(category.categoryName)}
                                >
                                    <Text style={activeCategory === category.categoryName ? styles.selectedText : styles.text}>{category.categoryName}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* flex3 */}

                <View style={styles.flex3}>
                    <FlatList
                        data={filteredProducts}
                        renderItem={({ item }) => (
                            <ProductCard product={item} onPress={() => onPress(item)} />
                        )}
                        keyExtractor={(item) => item._id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.container2}
                        columnWrapperStyle={styles.row}
                        ListEmptyComponent={<Text>Not found</Text>}
                    />
                </View>


                {/* flex4 */}
                <View style={styles.flex4}>
                    {navigators.map((nav, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(nav.navigation)}>
                            <Image source={nav.source} />
                        </TouchableOpacity>
                    ))}
                </View>
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
        marginTop: "12%",
        marginHorizontal: "5%",
    },
    locationText: {
        color: Colors.DEFAULT_BLACK,
        marginLeft: "2%",
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
        marginLeft: "3%",
    },
    searchText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: "5%",
    },

    specialDayTitle: {
        textDecorationLine: "underline",
        fontSize: 16,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: "5%",
        color: Colors.DEFAULT_BLACK,
        // Hoặc một giá trị phù hợp để căn lề trái
        marginBottom: "2%", // Khoảng cách giữa tiêu đề và ScrollView
    },

    // flex2

    listHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: "5%",
    },

    listHeaderTitle: {
        textDecorationLine: "underline",
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: "5%",
    },
    listHeaderSubtitle: {
        color: Colors.DEFAULT_YELLOW,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: "5%",
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
        paddingHorizontal: 10,
    },

    row: {
        justifyContent: 'space-between',
        gap: 8, 
        marginVertical: 10,
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
        width: '100%',
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
