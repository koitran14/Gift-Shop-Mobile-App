import { connect } from "react-redux";

import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";
import React, { useState, useEffect } from 'react';
import CartService from "../services/CartService";
import CartItem from "../components/CartItem";

const CartScreen = ({navigation, user}) => {

    const [selectedCarts, setSelectedCarts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const request = async() => {
            const carts = await CartService.getAllCartsByUserId(user._id);
            setCarts(carts);
        }
        request();
    }, [carts])

    useEffect(() => {
        let totalAmount = 0;
        let totalPrice = 0;
        carts.forEach((cart) => {
            if (checkSelected(cart)) {
                totalAmount += cart.quantity;
                totalPrice += cart.quantity * cart.product.price;
            }
        });
        setTotalAmount(totalAmount);
        setTotalPrice(totalPrice);
    }, [carts]);
    
    const handleCartSelection = (givenCart) => {
        const index = selectedCarts.findIndex((cart) => cart._id === givenCart._id);
        if (index === -1) {
            const selected = carts.find((cart) => cart._id === givenCart._id);
            setSelectedCarts([...selectedCarts, selected]);
        } else {
            const updatedSelectedProducts = selectedCarts.filter((cart) => cart._id !== givenCart._id);
            setSelectedCarts(updatedSelectedProducts);
            givenCart.quantity = carts.find((cart) => cart._id === givenCart._id).quantity;
        }
    };
    
    const handleAddToCart = async(cart) => {
        await CartService.updateQuantity(cart, cart.quantity + 1)
        console.log(cart.quantity)
    };

    const handleRemoveFromCart = async(cart) => {
        if (cart.quantity > 1) {
            await CartService.updateQuantity(cart, cart.quantity - 1)
        } else (
            Alert.alert(
                'Confirmation',
                'Are you sure you want to remove this item from the cart?',
                [
                    { text: 'Cancel', style: 'cancel',},
                    { text: 'Remove', onPress: async () => await CartService.removeCart(cardId)},
                ],
                { cancelable: true }
            )
        )
        console.log(cart.quantity)
    };

    const checkSelected = (cart) => {
        return selectedCarts.some(selectedCart => selectedCart._id === cart._id);
    }

    return (
        <LinearGradient
            colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1, position:'relative' }}
        >
            <View
                style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    paddingVertical: 50,
                    paddingHorizontal: 20,
                }}
            >
                <View style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>My Cart</Text>
                    <View style={{ width: 50}}></View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingHorizontal: 20,}}>
                {carts.map((cart, index)=> (
                    <View key={index}>
                        <CartItem 
                            cart={cart} 
                            onAdd={handleAddToCart} 
                            onRemove={handleRemoveFromCart} 
                            isSelected={selectedCarts.some(selectedCart => selectedCart._id === cart._id)} 
                            handleSelection={() => handleCartSelection(cart)}
                        />
                    </View>
                ))}
                {!carts && <Text>No cart</Text>}
            </View>

            {/* total price */}
            <View style={styles.frame}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.totalAmount}>
                            Total Amount:
                    </Text>
                    <Text style={styles.numberTotal}>
                            {totalAmount}
                    </Text>
                </View>
                <View style={styles.bar}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
                    <Text style={styles.totalPrice}>
                            Total Price:
                    </Text>
                    <Text style={styles.numberTotal}>
                            ${totalPrice.toFixed(2)}
                    </Text>
                </View>
                <TouchableOpacity 
                    disabled={selectedCarts.length === 0} 
                    style={[styles.smallFrame, { 
                            opacity: selectedCarts.length === 0 ? 0.7 : 1 
                        }
                    ]} 
                    onPress={() => navigation.navigate('CheckoutScreen', { selectedCarts })}
                >
                    <Text style={styles.checkout}>
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
   )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: Colors.DEFAULT_BLACK,
        fontWeight: '800',
        fontSize: 22,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    image: {
        marginTop: '-40%',
    },
    description: {
        alignContent: 'center',
        color: Colors.DEFAULT_BLACK,
        fontWeight: '400',
        fontSize: 22,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        marginTop: 20,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productContainer: {
        marginTop: 20,
    },
    productItem: {
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 20,
    },
    productName: {
        color: Colors.DEFAULT_BLACK,
        fontWeight: '200',
        fontSize: 14,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        marginBottom: 5,
        marginLeft: 35,
        marginVertical: -5.
    },
    productShop: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginVertical: -10,
    },
    productImage: {
        marginBottom: 5,
        width: 110,
        height: 110,
        marginLeft: 20,
    },
    productDescription: {
        fontSize: 13,
        marginBottom: 5,
        right: -140,
        width: 180,
        flexWrap: 'wrap',
        marginTop: -130,
    },
    productPrice: {
        fontSize: 15,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
        marginTop: 10,
        right: -140,
    },
    productQuantity: {
        fontSize: 15,
        color: Colors.DEFAULT_BLACK,
        right: '-455%',
    },
    frame: {
        backgroundColor: "#FAE4FF",
        width: '100%',
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignSelf: "center",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        display: 'flex',
        paddingHorizontal: 14,
        paddingTop: 20,
        paddingBottom: 14,
        position: 'absolute',
    },
    smallFrame: {
        backgroundColor: '#000',
        width: '80%',
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 20,
        display: 'flex',
        paddingHorizontal: 8,
    },
    totalAmount: {
        alignContent: 'left', 
        color: Colors.DEFAULT_BLACK,
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        marginTop: 0,
        marginLeft: '5%',
    },
    totalPrice: {
        alignContent: 'left', 
        color: Colors.DEFAULT_BLACK,
        fontSize: 20,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        marginTop: 0,
        marginLeft: '5%',
    },
    bar: {
        backgroundColor: "#000000",
        width: '90%',
        height: 1,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignSelf: "center",
        display: 'flex',
        paddingHorizontal: 8,
        marginVertical: 10,
        marginTop: 10,
    },
    bar2: {
        backgroundColor: "#000000",
        width: '100%',
        height: 1,
        justifyContent: "center",
        alignSelf: "center",
        display: 'flex',
        paddingHorizontal: 8,
        marginVertical: 10,
        marginTop: 10,
    },
    bar3: {
        backgroundColor: "#EBEBEB",
        width: '90%',
        height: 34,
        justifyContent: "center",
        alignSelf: "center",
        display: 'flex',
        marginTop: -5,
        marginVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 20
    },
    checkout: {
        alignItems: 'center',
        textAlign: 'center',
        color: Colors.DEFAULT_GREY,
        fontWeight: '300',
        fontSize: 24,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        paddingVertical: 8,
    },
    quantity: {
        alignContent: 'center',
        textAlign: 'center',
        color: "#FB881D",
        fontWeight: '800',
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        marginTop: 0,
    },
    quantityContainer: {
        alignItems: 'center',
    },
    selectedProduct: {
        width: 25,
        height: 25,
        backgroundColor: '#FFF3B1',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 2.5,
        marginHorizontal: 10,
        marginLeft: 0,
    },
    addButton: {
        width: 27,
        height: 27,
        right: '-880%',
    },
    removeButton: {
        width: 27,
        height: 27,
        right: '-550%',
    },
    addButtonOff: {
        width: 27,
        height: 27,
        right: '-665%',
    },
    removeButtonOff: {
        width: 27,
        height: 27,
        right: '-415%',
    },
    numberTotal: {
        marginLeft: 'auto',
        color: Colors.DEFAULT_BLACK,
        fontSize: 20,
        marginRight: '5%',
    },
    selectedProductYellow: {
        backgroundColor: 'yellow',
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.generalState.user,
    };
};

export default connect(mapStateToProps)(CartScreen);