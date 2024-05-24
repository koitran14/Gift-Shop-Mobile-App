import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Colors, Fonts, Images } from "../contants"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { LinearGradient } from "expo-linear-gradient";
import { CartService, ProductService } from "../services";
import { StoreService } from "../services"
import { FeedbackCard } from "../components";
import { connect } from "react-redux";
import { Toast } from "toastify-react-native";
import OrderService from "../services/OrderService";
import { StoreCard } from "../components/StoreCard";

const ProductScreen = ({ route, navigation, user }) => {
    const { product } = route.params;
    const [ searchText, setSearchText ] = useState(""); 
    const [ store, setStore ] = useState();
    const [ avgRating, setAvgRating] = useState(0);
    const [ haveSold, setHaveSold] = useState(0);

    useEffect(() => {
        setAvgRating(ProductService.averageRating(product.feedBacks))
        const getStoreByProductId = async() => {
            if (product) {
                const store = await StoreService.getStoreByProductId(product._id);
                setStore(store)
            }
        }

        const getHaveSold = async() => {
            if (product) {
                const quantity = await OrderService.getOrderQuantityByProductId(product._id);
                setHaveSold(quantity)
            }
        }

        getStoreByProductId();
        getHaveSold();
    },[])

    const handleSearchSubmit = () => {
        navigation.navigate("SearchScreen", {searchParams: searchText});
    }

    const addToCart = async() => {
        try {
            let cart = {
                user: user,
                product: product
            }
            await CartService.addToCart(cart);
            Toast.success("Added to cart.")
        } catch (error) {
            Toast.success("Something went wrong.")
        }
    }

    const visitStore = () => {
        navigation.navigate("ShopScreen", { store: store })
    }

    const checkoutAction = () => {
        navigation.navigate("CheckoutScreen", { selectedCarts: [{
            user: user,
            product: product,
            quantity: 1
        }]})
    }

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
                                        fontSize: 16,
                                        fontWeight: '500',
                                        height: 'fit'
                                    }}>
                                        {avgRating}/5.0
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontSize: 16,
                                            fontWeight: '500',
                                            height: 'fit',
                                            marginLeft: 12,
                                        }}
                                    >
                                        Have sold: {haveSold}
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
                        <StoreCard store={store} navigation={navigation}/>
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
                                    {ProductService.renderStars(avgRating)}
                                    <Text style={{
                                        fontSize: 16,
                                        color: 'orange',
                                        alignSelf: 'center',
                                        fontWeight: '700',
                                        marginRight: 5,
                                    }}>{avgRating}/5</Text>
                                    <Text style={{
                                        color: 'grey',
                                        fontWeight: '500'
                                    }}>
                                        ({product.feedBacks.length})
                                    </Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', gap: 5}}>
                                {product.feedBacks.map((feedback, index) => (
                                    <View key={index}>
                                        <FeedbackCard feedback={feedback}/>
                                    </View>
                                ))}
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
                        <TouchableOpacity 
                            style={{ width: '50%', height: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#F8F3EA'}}
                            onPress={addToCart}
                        >
                            <FontAwesome6 
                                name='cart-plus'
                                size={16}
                                color='purple'
                            />
                            <Text style={{ fontWeight: '700', fontSize: 16, color: 'purple'}}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                            onPress={checkoutAction}    
                        >
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
    storeLogo: {
        width: 70,
        height: 70,
        borderRadius: 40,
        alignItems: 'center'
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.generalState.user,
    };
};

export default connect(mapStateToProps)(ProductScreen);
