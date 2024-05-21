import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const API_URL = 'http://localhost:4000/api/cart';

export default function CartScreen ({navigation}) {
    const CheckoutPress = () =>{
    navigation.navigate('Checkout');
    };

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleProductSelection = (productId) => {
        const index = selectedProducts.findIndex((product) => product.id === productId);
        if (index === -1) {
            const selected = products.find((product) => product.id === productId);
            setSelectedProducts([...selectedProducts, selected]);
        } else {
            const updatedSelectedProducts = selectedProducts.filter((product) => product.id !== productId);
            setSelectedProducts(updatedSelectedProducts);
        }
    };

    const [products, setProducts] = useState([
    {
        id: 1,
        shop: "SFlower",
        name: "Bouquet",
        price: "$20.00",
        description: "Our stunning bouquet boasts a vibrant array of freshly picked flowers expertly arranged to convey heartfelt emotions and bring joy to any occasion.",
        image: Images.FLOWER,
        quantity: 1,
    },
    {
        id: 2,
        shop: "Cake Shop",
        name: "Birthday Cake",
        price: "$10.00",
        description: "Indulge in our exquisite birthday cake, featuring layers of moist sponge cake, creamy frosting, and personalized edible decorations",
        image: Images.BIRTHDAY_CAKE,
        quantity: 2,
    },
    ]);

    const handleAddToCart = (productId) => {
        const productToAdd = products.find(product => product.id === productId);
        axios.post(`${API_URL}/addToCart`, productToAdd)
            .then(response => {
                const addedProduct = response.data;
                setProducts(prevProducts => {
                    return prevProducts.map(product => {
                        if (product.id === productId) {
                            return { ...product, quantity: product.quantity + 1 };
                        }
                        return product;
                    });
                });
                setSelectedProducts([...selectedProducts, addedProduct]);
                setTotalAmount(prevTotalAmount => prevTotalAmount + 1);
                setTotalPrice(prevTotalPrice => prevTotalPrice + parseFloat(addedProduct.price.replace('$', '')));
            })
            .catch(error => {
                console.error("There was an error adding the product to the cart!", error);
            });
    };

    const handleRemoveFromCart = (productId) => {
        axios.post(`${API_URL}/removeFromCart`, { id: productId })
            .then(response => {
                const removedProduct = response.data;
                setProducts(prevProducts => {
                    return prevProducts.map(product => {
                        if (product.id === productId && product.quantity > 0) {
                            return { ...product, quantity: product.quantity - 1 };
                        }
                        return product;
                    });
                });
                setSelectedProducts(prevSelectedProducts => prevSelectedProducts.filter(product => product.id !== productId));
                setTotalAmount(prevTotalAmount => prevTotalAmount - 1);
                setTotalPrice(prevTotalPrice => prevTotalPrice - parseFloat(removedProduct.price.replace('$', '')));
            })
            .catch(error => {
                console.error("There was an error removing the product from the cart!", error);
            });
    };

    useEffect(() => {
        let totalAmount = 0;
        let totalPrice = 0;
        selectedProducts.forEach((product) => {
            totalAmount += product.quantity;
            totalPrice += product.quantity * parseFloat(product.price.replace('$', ''));
        });
        setTotalAmount(totalAmount);
        setTotalPrice(totalPrice);
    }, [selectedProducts]);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                const productsFromServer = response.data;
                setSelectedProducts(productsFromServer.map(product => ({ ...product, quantity: 1 })));
                setProducts(productsFromServer);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);
    

    return (
        <LinearGradient
        colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
        >
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
            <Text style={styles.headerTitle}>
                My Cart
            </Text>
        </View>
        {products.length > 0 ? (
            <View style={styles.productContainer}>
            <View style={styles.productItem}>
            <View style={styles.quantityContainer}>
                <View style={styles.bar3}>
                <Text style={styles.quantity}>
                    You have {selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ' '} in your list chart
                </Text>
                </View>
            </View>
            {products.map(product => (
                <View key={product.id }>
                    <View style={styles.bar2}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleProductSelection(product.id)}>
                            <View style={[styles.selectedProduct, selectedProducts.some(p => p.id === product.id) && styles.selectedProductYellow]}></View>
                        </TouchableOpacity>
                        <Text style={styles.productShop}>{product.shop}
                            <Text style={{        
                                fontWeight: '100',
                                fontSize: 20,
                                fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
                                }}>{' >'}
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Image source={product.image} resizeMode="contain" style={styles.productImage}/>
                    <Text style={styles.productDescription}>{product.description}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.productPrice}>{product.price}</Text>
                        {selectedProducts.some(p => p.id === product.id) ? (
                        <>
                        <TouchableOpacity onPress={() => handleAddToCart(product.id)}>
                            <Image source={Images.ADD} resizeMode="cover" style={styles.addButton}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRemoveFromCart(product.id)}>
                            <Image source={Images.REMOVE} resizeMode="cover" style={styles.removeButton}/>
                        </TouchableOpacity>
                        </>
                        ) : (
                        <>
                    <Image source={Images.ADD} resizeMode="cover" style={[styles.addButtonOff, { opacity: 0.5 }]} pointerEvents="none" />
                    <Image source={Images.REMOVE} resizeMode="cover" style={[styles.removeButtonOff, { opacity: 0.5 }]} pointerEvents="none" />
                        </>
                        )}
                        <Text style={styles.productQuantity}>{product.quantity}</Text>
                    </View>
                </View>
            ))}
            </View>
        </View>
            ):(
            <View style={styles.imageContainer}>
                <Image source={Images.CART2} resizeMode="cover" style={styles.image}/>
                <Text style={styles.description}>
                    You don't have any orders
                </Text>
            </View>
            )}
    </View>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.totalPrice}>
                Total Price:
        </Text>
        <Text style={styles.numberTotal}>
                ${totalPrice.toFixed(2)}
        </Text>
        </View>
        <TouchableOpacity style={styles.smallFrame} onPress={() => navigation.navigate('CheckoutScreen', { selectedProducts })}>
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
        alignContent: 'center',
        color: Colors.DEFAULT_BLACK,
        fontWeight: '800',
        fontSize: 22,
        lineHeight: 16 * 1.4,
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
        height: 160,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignSelf: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        display: 'flex',
        paddingHorizontal: 8,
        position: 'absolute',
    },
    smallFrame: {
        backgroundColor: "#000000",
        width: 281,
        height: 54,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 20,
        display: 'flex',
        paddingHorizontal: 8,
        marginTop: 10,
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
        fontWeight: '400',
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
        alignContent: 'center',
        textAlign: 'center',
        color: Colors.DEFAULT_GREY,
        fontWeight: '200',
        fontSize: 24,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
        marginTop: 0,
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
