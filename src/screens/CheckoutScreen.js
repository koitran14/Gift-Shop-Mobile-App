import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { Toast } from "toastify-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";
import { CartItem, VoucherCard } from "../components";
import { CheckoutService } from "../services";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import CartService from "../services/CartService";

const CheckoutScreen = ({navigation, route, user}) => {
    const { selectedCarts } = route.params;
    const [items, setItems] = useState(selectedCarts);
    const [payments, setPayments] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState();
    const [selectedVoucher, setSelectedVoucher] = useState();
    const [openVoucherList, setOpenVoucherList] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
        const getCheckout = async() => {
            let payments = await CheckoutService.getAllPayments();
            let vouchers = await CheckoutService.getAllVouchers();
            setPayments(payments);
            setVouchers(vouchers)
            setSelectedPayment(payments[0])
        }
        getCheckout();
    },[])

    useEffect(() => {
        calculateCosts();
    }, [items, selectedVoucher]);

    const calculateCosts = () => {
        const productCost = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        setTotalCost(productCost);

        const discount = selectedVoucher ? selectedVoucher.discount : 0;
        setTotalDiscount(discount * totalCost);
    };

    const handleUncheck = (item) => {
        Alert.alert(
            "Remove your selection",
            "Are you sure you want to remove this item from selection?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Remove",
                    onPress: () => {
                        const updatedCarts = items.filter(cart => cart._id !== item._id);
                        Toast.success("Removed.")
                        setItems(updatedCarts);
                        if (items.length === 0) {
                            navigation.goBack();
                        }
                    }
                }
            ]
        );
    };

    const handleSubmit = async() => {
        try {
            const request = await CheckoutService.order({
                paymentMethod: selectedPayment,
                voucher: selectedVoucher,
                orderDetails: items ? items : [],
                orderDate: new Date()
            });
            Toast.success("Ordered.")
            navigation.goBack();
        } catch (error) {
            Toast.error("Something went wrong.")
        }
    }

    const handleAddToCart = async (cart) => {
        const updatedCart = { ...cart, quantity: cart.quantity + 1 };
        await CartService.updateQuantity(cart._id, updatedCart.quantity);
        setItems(items.map(item => (item._id === cart._id ? updatedCart : item)));
    };

    const handleRemoveFromCart = async (cart) => {
        if (cart.quantity > 1) {
            const updatedCart = { ...cart, quantity: cart.quantity - 1 };
            await CartService.updateQuantity(cart._id, updatedCart.quantity);
            setItems(items.map(item => (item._id === cart._id ? updatedCart : item)));
        } else {
            Alert.alert(
                'Confirmation',
                'Are you sure you want to remove this item from the cart?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Remove',
                        onPress: async () => {
                            await CartService.removeCart(cart._id);
                            setItems(items.filter(item => item._id !== cart._id));
                            Toast.success("Removed.");
                            if (items.length === 0) {
                                navigation.goBack();
                            }
                        }
                    }
                ],
                { cancelable: true }
            );
        }
    };
   
    return (
        <LinearGradient
            colors={['#F6E8FF', '#F6E8FF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <ScrollView>
            <View
                style={{ 
                    flex: 1, 
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
                    justifyContent: 'space-between',
                }}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={{ fontSize: 26, fontWeight: '600'}}>Checkout</Text>
                    <View style={{ width: 40}}></View>
                </View>
                <View style={{ marginTop: 20, display: 'flex', gap: 5, padding: 5}}>
                    {items?.map((cart, index) => (
                        <View key={index}>
                            <CartItem cart={cart} 
                                onAdd={() => handleAddToCart(cart)}
                                onRemove={() => handleRemoveFromCart(cart)}
                                isSelected={true}
                                handleSelection={() => handleUncheck(cart)}
                            />
                        </View>
                    ))}
                </View>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, gap: 10 }}>
                        <Image source={Images.USER} resizeMode="contain" style={styles.map}/>
                        <View style={{ display: 'flex', gap: 2}}>
                            <Text style={{ fontWeight: '400', fontSize: 16}}>Username: {user.username}</Text>
                            <Text style={{ fontWeight: '400', fontSize: 16}}>Email: {user.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.bar2}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', paddingVertical: 5,}}>Select a payment method</Text>
                </View>
                
                <View style={styles.paymentMethodsContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {payments.map((payment, index) => (
                                <View 
                                    style={[styles.box,
                                        (payment._id === selectedPayment?._id) && {backgroundColor: 'pink'}
                                    ]} 
                                    key={index}
                                >
                                    <TouchableOpacity  
                                        key={index} 
                                        style={{ flexDirection: 'row', alignItems: 'center' }} 
                                        onPress={() => setSelectedPayment(payment)}
                                    >
                                        <Text style={styles.moneyText}>{payment.paymentTitle}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                    </ScrollView>
                </View>
                <View style={styles.bar2}></View>
                <Text style={styles.voucher}>Voucher</Text>
                
                <View 
                    style={{ 
                        display: 'flex', 
                        gap: 10, 
                        backgroundColor: 'white', 
                        borderRadius: 20, 
                        flexDirection: 'column',
                        marginVertical: 12,
                    }}
                >
                    <TouchableOpacity 
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 18 }} 
                        onPress={() => setOpenVoucherList(!openVoucherList)}
                    >
                        <Text style={styles.voucherText}>Available voucher</Text>
                        <AntDesign 
                            name={openVoucherList ? 'up' : 'down'}
                            size={20}
                            color={'black'}
                        />
                    </TouchableOpacity>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                        paddingHorizontal: 15
                    }}>
                        {openVoucherList && 
                            vouchers?.map((voucher, index) => (
                                <View key={index}>
                                    <VoucherCard 
                                        voucher={voucher} 
                                        isSelected={voucher?._id === selectedVoucher?._id} 
                                        handleSelection={() => setSelectedVoucher(voucher)}
                                    />
                                </View>
                            ))
                        }
                    </View>
                </View>

                <View style={styles.bar2}></View>
                <View style={{ 
                    display: 'flex',
                    gap: 5, 
                    flexDirection: 'column',
                    paddingVertical: 10,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.leftInstance}>Product cost</Text>
                        <Text style={styles.leftInstance}>${totalCost.toFixed(2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.leftInstance}>Voucher</Text>
                        <Text style={styles.leftInstance}>- ${totalDiscount.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>Total:</Text>
                    <Text style={styles.total}>${(totalCost - totalDiscount).toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.confirmContainer} onPress={handleSubmit}>
                    <LinearGradient colors={['#FB9EC5', '#D491AD', '#FFDBEA']} 
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.gradientBox}
                    >
                        <Text style={styles.confirm}>Confirm payment</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        alignContent: 'center', 
        color: Colors.DEFAULT_BLACK,
        fontWeight: '800',
        fontSize: 22,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    paymentMethodsContainer: {
        flexDirection: 'row',
        paddingVertical: 0,
    },
    productContainer: {
        marginBottom: 0,
        padding: 0,
    },
    productName: {
        fontSize: 20,
        fontWeight: '200',
        marginBottom: 5,
        marginLeft: 10,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    productImage: {
        marginBottom: 5,
        width: 80,
        height: 80,
        marginLeft: 20,
    },
    productShop: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginVertical: -10,
        marginLeft: 5,
    },
    productPrice: {
        marginTop: -10,
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 'auto',
        right: '700%',
        fontWeight: '300',
    },
    productQuantity: {
        marginTop: -10,
        fontSize: 16,
        marginBottom: 5,
        right: '115%',
    },
    updateButton: {
        color: Colors.DEFAULT_YELLOW,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    bar: {
        backgroundColor: "#000000",
        width: '100%',
        height: 1,
        justifyContent: "center",
        alignSelf: "center",
        display: 'flex',
        paddingHorizontal: 8,
        marginVertical: 10,
        marginTop: 7,
        opacity: 0.25,
    },
    bar2: {
        backgroundColor: "#FADCFF",
        width: '120%',
        height: 7,
        display: 'flex',
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: '2%',
    },
    box: {
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginHorizontal: 5,
        marginVertical: 10,
    },
    box2: {
        height: 50,
        width: 220,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 25,
        borderColor: "#CC33E5",
        borderWidth: 2,
        padding: 5,
        flexDirection: 'column',
        alignItems: 'left',
        marginVertical: 5,
    },
    moneyText: {
        marginHorizontal: 5, 
        marginTop: -2,
        fontSize: 16,
        fontWeight: '800',
    },
    shop: {
        width: 24,
        height: 24,
        marginTop: -15
    },
    addButton: {
        marginTop: -15,
        width: 23,
        height: 23,
        right: '30%',
    },
    removeButton: {
        marginTop: -15,
        width: 23,
        height: 23,
        right: '140%',
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
    note: {
        fontWeight: '200',
        marginLeft: 'auto',
        marginTop: -50,
    },
    note2: {
        fontWeight: '400',
        right: '-240%',
        marginTop: -20,
        fontSize: 20
    },
    map: {
        width: 35,
        height: 35,
    },
    HomeBox: {
        backgroundColor: '#858AFF',
        width: 48,
        height: 16,
        borderRadius: 5,
        marginLeft: -195,
        marginTop: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    home: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 16,
        fontWeight: '100',
        lineHeight: 17,
    } ,
    phone: {
        fontsize: 15,
        color: Colors.DEFAULT_BLACK,
        opacity: 0.5,
        marginTop: -24,
        marginHorizontal: 10
    },
    address: {
        fontsize: 15,
        color: Colors.DEFAULT_BLACK,
        opacity: 0.5,
        marginTop: 19,
        marginLeft: -113,
    },
    username: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        marginVertical: -20,
        marginLeft: 5,
    },
    seeAll: {
        marginLeft: 'auto',
        color: "#0E3E9A",
    },
    voucher: {
        color: "#7D209D",
        fontSize: 20,
    },
    apply: {
        color: "#8736AC",
        fontSize: 20,
        marginTop: -5,
        fontWeight: '600',

    },
    applyContainer: {
        backgroundColor: "#DFB4EA",
        width: 81,
        height: 39,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 'auto',
        left: '-20%',
    },
    voucherText: {
        color: "#5A407B",
        fontSize: 16,
        fontWeight: '500',
    },
    leftInstance:{
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    confirm: {
        color: '#7F3480',
        fontSize: 20,
        fontWeight: '500'
    },
    confirmContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientBox: {
        width: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 5,
    },
    total: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 22,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginVertical: '2%',
        marginLeft: '2%',
    },
    totalContainer: {
        backgroundColor: "#F9DFFF",
        borderColor: "#F5B5FF",
        borderWidth: 2,
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 20,
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.generalState.user,
    };
};

export default connect(mapStateToProps)(CheckoutScreen);