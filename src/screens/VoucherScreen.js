import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";

export default function VoucherScreen ({ navigation }) {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxPress = (box) => {
        setSelectedBox(box);
    };
    const [products, setProducts] = useState([
        {
            id: 1,
            title: "Up to 5$",
            description: "24% discount on all SFlower products",
            expiredDate: "Exp 8 April 2024",
        },
        {
            id: 2,
            title: "Up to 5$",
            description: "10% discount on all Cake Shop products",
            expiredDate: "Exp 25 May 2024",
        },
    ]);

    const [deliveries, setDeliveries] = useState([
        {
            id: 1,
            title: "Up to 10$",
            description: "100% discount",
            expiredDate: "Exp 12 June 2024",
        },
    ]);
<<<<<<< HEAD
    
=======
>>>>>>> 9790eb881864b6ea53eef9c6714865a877d37404
    const boxContent = {
        left: (
            <View style={{paddingHorizontal: 20, marginTop: 15}}>
            <Text>You can choose 1 Voucher</Text>
            
            {products.map(product => (
                <View key={product.id}>
                    <View style={styles.voucherBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ImageBackground source={Images.CIRCLE} style={styles.circle}>
                            <Image source={Images.TICKET}  resizeMode="contain" />
                        </ImageBackground>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                    <View style={styles.bar}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7 }}>
                    <Image source={Images.CALENDAR} style={styles.calendar}></Image>
                    <Text style={styles.date}>{product.expiredDate}</Text>
                    <View style={styles.applyBox}>
                        <TouchableOpacity>
                            <Text>
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                        </View>
                    </View>
                </View>
            ))}
      
                {/*<View style={styles.overlayBox}>
                    <View style={styles.acceptBox}>
                    <Text style={styles.overlayText}>Accept</Text>
                    </View>
        </View>*/}
            </View>
        ),
        right: (
            <View style={{paddingHorizontal: 20, marginTop: 15}}>
            <Text>You can choose 1 Delivery Voucher</Text>
            {deliveries.map(delivery => (
                <View key={delivery.id}>
                    <View style={styles.voucherBox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ImageBackground source={Images.CIRCLE} style={styles.circle}>
                                <Image source={Images.TICKET} resizeMode="contain" />
                            </ImageBackground>
                            <Text style={styles.title}>{delivery.title}</Text>
                            <Text style={styles.description}>{delivery.description}</Text>
                        </View>
                        <View style={styles.bar}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7 }}>
                            <Image source={Images.CALENDAR} style={styles.calendar}></Image>
                            <Text style={styles.date}>{delivery.expiredDate}</Text>
                            <View style={styles.applyBox}>
                            <TouchableOpacity>
                                <Text>
                                    Apply
                                </Text>
                            </TouchableOpacity>
                    </View>
                        </View>
                    </View>
                </View>
            ))}
                {/*<View style={styles.overlayBox}>
                    <View style={styles.acceptBox}>
                    <Text style={styles.overlayText}>Accept</Text>
                    </View>
        </View>*/}
            
            </View>  
        ),
    };
    return (
        <LinearGradient
            colors={['#F6E8FF', '#F6E8FF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingVertical: 50,
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
                            paddingHorizontal: 20,
                        }}
                    />
                    <Text style={styles.headerTitle}>Choose Voucher</Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={[styles.box, selectedBox === 'left' ? styles.selectedLeftBox : null]} 
                        onPress={() => handleBoxPress('left')}>
                        <Text style={styles.boxText}>Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.box, selectedBox === 'right' ? styles.selectedRightBox : null]} 
                        onPress={() => handleBoxPress('right')}>
                        <Text style={styles.boxText}>Delivery</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxContent}>
                    {selectedBox && boxContent[selectedBox]}
                </View>
                
            </View>
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
        marginHorizontal: '-10%',
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 0,
        marginTop: 35,
    },
    box: {
        width: "50%",
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#EED3FF',
    },
    selectedLeftBox: {
        backgroundColor: '#C38BE6',
        //background: 'linear-gradient(45deg, #846199, #C38BE6, #EBC9FF)',
    },
    selectedRightBox: {
        backgroundColor: '#C38BE6',
        //background: 'linear-gradient(45deg, #846199, #C38BE6, #EBC9FF)',
    },
    boxText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 18,
        fontWeight: '300',
    },
    voucherBox: {
        width: '95%',
        height: 120,
        backgroundColor: Colors.DEFAULT_WHITE,
        justifyContent: 'center',
        alignItems: 'left',
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 10,
    },
    circle: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -70,
        marginLeft: '5%',
    },
    title: {
        fontSize: 16,
        marginTop: -90,
        marginLeft: 10,
    },
    description: {
        fontSize: 14,
        opacity: 0.5,
        marginTop: -40,
        marginLeft: -61,
    },
    bar: {
        backgroundColor: Colors.DEFAULT_BLACK,
        opacity: 0.5,
        width: '100%',
        height: 1,
        marginBottom: -20,
    },
    calendar: {
        marginBottom: -80,
        marginLeft: 22,
    },
    date: {
        marginBottom: -80,
        marginLeft: 15,
    },
    apply: {
        color: Colors.DEFAULT_BLACK,
    },
    applyBox: {
        width: 87,
        height: 31,
        backgroundColor: "#D9D9D9",
        marginBottom: -80,
        marginLeft: 'auto',
        right: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayBox: {
        position: 'absolute',
        bottom: '-110%',
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        zIndex: 1, // Ensure it appears above other content
    },
    overlayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    acceptBox: {
        backgroundColor: "#ECB6FF",
        alignItems: 'center',
        justifyContent: 'center',
        width: 231,
        height: 43,
        borderRadius: 5,
    },
});
