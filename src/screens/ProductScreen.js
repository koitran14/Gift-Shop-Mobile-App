import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Colors, Fonts } from "../contants"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { LinearGradient } from "expo-linear-gradient";
import { ProductService } from "../services";
import { FeedbackCard } from "../components";

const ProductScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [ searchText, setSearchText ] = useState(""); 
    const [products, setProducts] = useState([]);

    const handleSearchSubmit = () => {
        const filtered = products?.filter((product) => {
            return product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
                   product.productDescription.toLowerCase().includes(searchText.toLowerCase());
        });
        navigation.navigate("SearchScreen", { searchResults: filtered });
    }

    const visitStore = () => {
        navigation.navigate('ShopScreen', { productId: product._id })
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
            style={{ flex: 1, width: '100%', position: 'relative' }}
        >
            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 12,
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
                        <TouchableOpacity>
                            <AntDesign
                                name="hearto"
                                size={20}
                                color={Colors.DEFAULT_BLACK}  
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingTop: 10
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        marginBottom: 50,
                    }}>
                        <Image source={{uri: product.productImage}} style={styles.cardImage} />
                        <View
                            style={{
                                display: 'flex',
                                flexDirection:'column',
                                backgroundColor: 'white',
                                borderRadius: 10,
                                padding: 10,
                            }}
                        >
                            <Text style={styles.price}>${product.price}</Text>
                            <Text style={styles.cardName}>{product.productName}</Text>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginTop: 15,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <AntDesign
                                            name="star"
                                            size={15}
                                            color={Colors.DEFAULT_YELLOW}
                                            style={{
                                                marginRight: 5
                                            }}
                                    />
                                    <Text style={{ 
                                        paddingRight: 12,
                                        borderRightWidth: 1,
                                        borderRightColor: 'lightgrey',
                                        fontSize: 14,
                                        fontWeight: '300',
                                        height: 'fit'
                                    }}>
                                        Rate
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontSize: 14,
                                            fontWeight: '300',
                                            height: 'fit',
                                            marginLeft: 12,
                                        }}
                                    >
                                        Have sold
                                    </Text>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 5,
                                    padding: 5,
                                }}>
                                    <TouchableOpacity>
                                        <AntDesign
                                            name="hearto"
                                            size={20}
                                            color={Colors.DEFAULT_BLACK}  
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{
                                display: 'flex',
                                flexDirection:'row',
                                gap: 10,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                padding: 15,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 15,
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 9999,
                                    backgroundColor: 'lightgrey'
                                }}></View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <Text style={{ fontWeight: '500', fontSize: 20, color: 'red' }}>
                                        Store
                                    </Text>
                                    <Text style={{ fontWeight: '400', fontSize: 12, color: 'grey' }}>
                                        Online 2 minutes ago
                                    </Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                        <Ionicons
                                            name="globe"
                                            size={20}
                                            color={Colors.DEFAULT_GREY}
                                        />
                                        <Text style={{ fontWeight: '400', fontSize: 12, color: 'grey' }}>
                                            Ho Chi Minh City
                                        </Text>
                                    </View>
                                </View>
                            </View> 
                            <TouchableOpacity 
                                style={{ padding: 15, backgroundColor: 'pink', borderColor: 'red', borderRadius: 50}}
                                onPress={visitStore}
                            >
                                <Text style={{ fontWeight: '500' }}>Visit Store</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10, backgroundColor: 'white',  borderRadius: 10, padding: 10}}>
                            <Text style={{ fontSize: 16, fontWeight: '500', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>PRODUCT INFORMATION:</Text>
                            <Text>{product.productDescription}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 10, backgroundColor: 'white',  borderRadius: 10, padding: 10}}>
                            <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                                <Text style={{fontSize: 16, fontWeight: '500'}}>
                                    FEEDBACK:
                                </Text>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems:'center'}}>
                                    <Ionicons name="star" size={15} color={'orange'}/>
                                    <Ionicons name="star" size={15} color={'orange'}/>
                                    <Ionicons name="star" size={15} color={'orange'}/>
                                    <Ionicons name="star" size={15} color={'orange'}/>
                                    <Ionicons name="star" size={15} color={'orange'}/>
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'orange',
                                        alignSelf: 'center',
                                        fontWeight: '700',
                                        marginRight: 5,
                                    }}>4.5/5</Text>
                                    <Text style={{
                                        color: 'grey',
                                        fontWeight: '500'
                                    }}>
                                        (3 feedbacks)
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <FeedbackCard />
                            </View>
                        </View>
                    </View>
                </ScrollView>
           </View>
           <View style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0,
                    height: 50, 
                    width: '100%', 
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <View style={styles.flex4}>
                        <TouchableOpacity style={{ width: '50%', height: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: 'white'}}>
                            <FontAwesome6 
                                name='cart-plus'
                                size={16}
                                color='purple'
                            />
                            <Text style={{ fontWeight: '700', fontSize: 16, color: 'purple'}}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ fontWeight: '400', fontSize: 16}}>
                                BUY NOW
                            </Text>
                            <Text style={{ fontWeight: '700', fontSize: 16}}>${product.price}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 5,
        paddingBottom: 30,
        paddingTop: 40,
        paddingHorizontal: 2,
    },
    container1: {  
        backgroundColor: '#f8f8f8f',
        flex: 1,
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        gap: 10,
        paddingBottom: 20,
        paddingHorizontal: 15,
        alignItems: 'flex-start',
    },
    card: {
        backgroundColor: "#fffdfd",
        width: "49.5%",
        borderRadius: 12,
        borderColor: "white",
        padding: 10,
        alignItems: 'flex-start'
    },
    cardImage: {
        backgroundColor: '#f8f8f8',
        width: '100%',
        objectFit: 'contain',
        height: 200,
        borderRadius: 10,
    },
    cardName: {
        fontSize: 18,
        fontWeight: "500",
    },
    price: {
        color: 'red',
        fontSize: 28,
        fontWeight: '700',
    },
    cardDescription: {
        fontSize: 16,
        fontWeight: '400',
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
});

export default ProductScreen;
