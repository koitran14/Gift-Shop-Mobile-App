import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useEffect, useState } from "react";
import { CheckoutService } from "../../services";
import {Images } from "../../contants";
import Ionicons from "react-native-vector-icons/Ionicons";

export const ProfileRoute = ({ route, navigation }) => {    
    const { user } = route;
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const getPayments = async() => {
            const payments = await CheckoutService.getAllPayments();
            setPayments(payments);
        }
        getPayments();
    },[])

    const socialLinks = [
        { platform: "Facebook", linked: false, image: Images.FACEBOOK },
        { platform: "Google", linked: true, image: Images.GOOGLE }
    ]

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* User Info */}
            <View style={styles.userInfo}>
                <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Name: </Text>{user.username}</Text>
                <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Email: </Text>{user.email}</Text>
                <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Password: </Text>*********</Text>

            </View>

            {/* Actions */}
            <TouchableOpacity style={styles.actionButton} onPress={() => { }}>
                <Text style={styles.actionText}>Change Password</Text>
            </TouchableOpacity>

            {/* Payment Methods */}
            <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
            {payments?.map((payment, index) => (
                <View key={index} style={styles.card}>
                    {payment.thumbnail ? (
                        <Image source={{ uri: payment.thumbnail }} style={styles.cardImage} />
                    ): (
                        <Image source={Images.MONEY} style={styles.cardImage} />
                    )}
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{payment.paymentTitle}</Text>
                        <Text style={styles.cardNumber}>*********</Text>
                    </View>
                    <Ionicons name="pencil" size={20} onPress={() => { }} style={styles.editIcon} />
                </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={() => { /* handle add card */ }}>
                <Ionicons name="add-circle-outline" size={24} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {/* Social Links */}
            <Text style={styles.sectionTitle}>Link Social Account</Text>
            {socialLinks.map((link, index) => (
                <View key={index} style={styles.socialLinkItem}>
                    <Image source={link.image} style={styles.socialIcon} />
                    <Text>{link.platform}: {link.linked ? `Signed in as ${user.username}` : 'Not signed in'}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 20,
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#CCC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#BBB',
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
    },
    details: {
        color: "gray",
        fontSize: 16,
    },
    menuIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
        borderWidth: 1,
        borderColor: 'rgba(180, 160, 220, 0.9)',
        paddingVertical: 10,
        backgroundColor: "white",
    },
    userInfo: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    infoLabel: {
        fontSize: 16,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        paddingBottom: 10,
    },
    actionButton: {
        backgroundColor: "#52b2bf",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    actionText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#DDD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardNumber: {
        fontSize: 14,
        color: "gray",
    },
    editIcon: {
        marginLeft: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        marginVertical: 10,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
    cardImage: {
        width: 80,
        height: 50,
        resizeMode: 'contain',
    },
    socialLinkItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    socialIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
})