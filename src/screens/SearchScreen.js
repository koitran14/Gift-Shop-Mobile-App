import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Colors, Fonts } from "../contants"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { ProductService } from "../services";
import { ProductCard } from "../components";

const SearchScreen = ({ route, navigation }) => {
    const { searchResults } = route.params;
    const [ searchText, setSearchText ] = useState(""); 
    const [products, setProducts] = useState([]);

    const handleSearchSubmit = () => {
        const filtered = products?.filter((product) => {
            return product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
                   product.productDescription.toLowerCase().includes(searchText.toLowerCase());
        });
        navigation.navigate("SearchScreen", { searchResults: filtered });
    }

    const onPress = (product) => {
        navigation.navigate("ProductScreen", { product: product });
    }

    useEffect(() => {
        const getProducts = async() => {
            const products = await ProductService.getAllProducts();
            setProducts(products);
            return products;
        }
        getProducts();
    },[])

    return (
        <LinearGradient
            colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                }}>
                     <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
                            size={25}
                            color={Colors.DEFAULT_BLACK}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchContainer}>
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
                            color={Colors.DEFAULT_BLACK}
                            style={{ marginRight: 10 }}
                        />
                    </View>
                </View>
                <View style={styles.container1}>
                    <FlatList
                        data={searchResults}
                        renderItem={({ item }) => (
                            <ProductCard product={item} onPress={() => onPress(item)} />
                        )}
                        keyExtractor={(item) => item._id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.container1}
                        columnWrapperStyle={styles.row}
                        ListEmptyComponent={<Text>Not found</Text>}
                    />
                </View>
           </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 40,
        paddingBottom: 20,
    },
    container1: {
        backgroundColor: '#f8f8f8f',
        paddingHorizontal: 10,
    },
    row: {
        justifyContent: 'space-between',
        gap: 8, 
        marginVertical: 10,
    },
    searchContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: 50,
        borderRadius: 8,
        width: '80%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "3%",
        width: '100%',
    },
    searchText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: "5%",
        width: '78%',

    },
});

export default SearchScreen;
