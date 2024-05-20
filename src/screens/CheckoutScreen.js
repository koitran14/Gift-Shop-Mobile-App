import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";

export default function CheckoutScreen ({navigation, route}) {
    const { selectedProducts } = route.params;
    const [inputText, setInputText] = useState("");

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
                }}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        onPress={() => navigation.goBack()}
                        style={{
                            alignSelf: 'flex-start',
                            marginRight: 90,
                        }}
                    />
                </View>
                {selectedProducts.map((product, index) => (
                    <View key={index} style={styles.productContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={product.image} resizeMode="contain" style={styles.productImage}/>
                        <Text style={styles.productName}>{product.name}</Text>
                        <TouchableOpacity style={styles.note}>
                                <Text>Note {'>'}</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={Images.SHOP} resizeMode="cover" style={styles.shop}/>
                            <Text style={styles.productShop}>{product.shop}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>                        
                            <TouchableOpacity>
                                <Image source={Images.REMOVE} resizeMode="cover" style={styles.removeButton}/>
                            </TouchableOpacity>
                            <Text style={styles.productQuantity}>{product.quantity}</Text>
                            <TouchableOpacity>
                                <Image source={Images.ADD} resizeMode="cover" style={styles.addButton}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bar}></View>
                    </View>
                ))}
                <TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Image source={Images.MAP} resizeMode="contain" style={styles.map}/>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.username}>Username</Text>
                        <Text style={styles.phone}>Phone number</Text>
                        <Text style={styles.note2}>{'>'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.HomeBox}>
                            <Text style={styles.home}>HOME</Text>
                        </View>
                    <View>
                </View>
                </View>
                    <Text style={styles.address}>Address</Text>
                </View>
                </TouchableOpacity>
                <View style={styles.bar2}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Select a payment method</Text>
                    <TouchableOpacity  style={styles.seeAll}>
                    <Text>See all {'>'}</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.paymentMethodsContainer}>
                <ScrollView horizontal={true}>
                    <View style={styles.box}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={Images.MONEY} resizeMode="contain"/>
                            <Text style={styles.moneyText}>Cash on delivery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={Images.PAYPAL} resizeMode="contain"/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>
                <View style={styles.bar2}></View>
                <Text style={styles.voucher}>Voucher</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.box2}>
                        <TextInput
                            style={{ flex: 1, marginLeft: 10 }}
                            placeholder="Enter discount code"
                            //onChangeText={setInputText}
                        ></TextInput>
                    </View>
                    <View style={styles.applyContainer}>
                        <Text style={styles.apply}>Apply</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                navigation.navigate('VoucherScreen', { selectedProducts })}}>
                    <Text style={styles.voucherText}>Available voucher</Text>
                    <Text style={{marginLeft: 'auto', right: 10, fontSize: 20}}>{'>'}</Text>
                </TouchableOpacity>
                <View style={styles.bar2}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.leftInstance}>Product cost</Text>
                    {/* Insert product cost here */}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.leftInstance}>Delivery service</Text>
                    {/* Insert delivery cost here */}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.leftInstance}>Voucher</Text>
                    {/* Insert voucher cost here */}
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>Total:</Text>
                    {/* Insert voucher cost here */}
                </View>
                <TouchableOpacity style={styles.confirmContainer}>

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
        marginVertical: 15,
        height: 50,
        width: 186,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
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
        fontSize: 20,
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
        width: 42,
        height: 42,
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
        fontsize: 16,
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
        fontWeight: 'bold',
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
        marginLeft: '2%',
        marginVertical: '5%',
    },
    leftInstance:{
        alignContent: 'left', 
        color: Colors.DEFAULT_BLACK,
        fontWeight: '200',
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        marginVertical: '1%',
        marginLeft: '2%',
    },
    rightInstance: {
        marginLeft: 'auto',
        color: Colors.DEFAULT_BLACK,
        fontSize: 18,
        marginRight: '5%',
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
        marginTop: 5,
    },
    total: {
        color: Colors.DEFAULT_BLACK,
        fontWeight: '200',
        fontSize: 22,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        marginVertical: '2%',
        marginLeft: '2%',
    },
    totalContainer: {
        backgroundColor: "#F9DFFF",
        borderColor: "#F5B5FF",
        borderWidth: 1,
        width: '100%',
        height: 36,
        display: 'flex',
        justifyContent: "left",
        alignSelf: "center",
        marginVertical: '2%',
        flexDirection: 'row',
    },
});
