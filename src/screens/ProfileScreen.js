import React, { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

const ProfileScreen = ({ navigation }) => {

    const [userInfo, setUserInfo] = useState({
        name: "Mary Johnson",
        username: "Mary",
        gender: "Female",
        birthday: "January 1, 1990",
        phone: "123-456-7890",
        email: "mary@example.com",
        location: "Los Angeles, California, USA",
        cards: [
            { type: "VISA Credit Card", number: "XXXX-XXXX-XXXX-1123", image: Images.VISA },
            { type: "MasterCard", number: "XXXX-XXXX-XXXX-5100", image: Images.MASTERCARD }
        ],
        socialLinks: [
            { platform: "Facebook", linked: false, image: Images.FACEBOOK },
            { platform: "Google", linked: true, image: Images.GOOGLE }
        ],
    });
    const [selectedIcon, setSelectedIcon] = useState('person'); // Tracks which icon is selected

    useEffect(() => {
        setSelectedIcon('person');
    }, []);

    const handleIconPress = (iconName) => {
        setSelectedIcon(iconName); // Update the selected icon

        switch (iconName) {
            case 'person':
                navigation.navigate('ProfileScreen');
                break;
            case 'heart':
                navigation.navigate('FavoriteScreen');
                break;
            case 'cube':
                break;
            case 'clipboard':
                break;
            default:
                break;
        }
    };

    return (
        <LinearGradient
            colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1, paddingTop: 40 }}
        >
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            {/* Profile Details */}
            <View style={styles.profileDetails}>
                <Image source={Images.USER} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>{userInfo.username}</Text>
                    <Text style={styles.details}>{userInfo.gender}</Text>
                    <Text style={styles.details}>{userInfo.location}</Text>
                </View>
            </View>

            {/* Menu Icons */}
            <View style={styles.menuIcons}>
                <TouchableOpacity onPress={() => handleIconPress('person')} style={styles.icon(selectedIcon === 'person')}>
                    <Ionicons name="person-outline" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIconPress('heart')} style={styles.icon(selectedIcon === 'heart')}>
                    <Ionicons name="heart-outline" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIconPress('cube')} style={styles.icon(selectedIcon === 'cube')}>
                    <Ionicons name="cube-outline" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleIconPress('clipboard')} style={styles.icon(selectedIcon === 'clipboard')}>
                    <Ionicons name="clipboard-outline" size={30} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* User Info */}
                <View style={styles.userInfo}>
                    <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Name: </Text>{userInfo.name}</Text>
                    <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Gender: </Text>{userInfo.gender}</Text>
                    <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Birthday: </Text>{userInfo.birthday}</Text>
                    <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Phone: </Text>{userInfo.phone}</Text>
                    <Text style={styles.infoLabel}><Text style={{ fontWeight: 'bold' }}>Email: </Text>{userInfo.email}</Text>
                </View>

                {/* Actions */}
                <TouchableOpacity style={styles.actionButton} onPress={() => { }}>
                    <Text style={styles.actionText}>Change Password</Text>
                </TouchableOpacity>

                {/* Payment Methods */}
                <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
                {userInfo.cards.map((card, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={card.image} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{card.type}</Text>
                            <Text style={styles.cardNumber}>{card.number}</Text>
                        </View>
                        <Ionicons name="pencil" size={20} onPress={() => { }} style={styles.editIcon} />
                    </View>
                ))}

                <TouchableOpacity style={styles.addButton} onPress={() => { /* handle add card */ }}>
                    <Ionicons name="add-circle-outline" size={24} color="#007AFF" style={{ marginRight: 8 }} />
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>

                {/* Social Links */}
                <Text style={styles.sectionTitle}>Link Social Account</Text>
                {userInfo.socialLinks.map((link, index) => (
                    <View key={index} style={styles.socialLinkItem}>
                        <Image source={link.image} style={styles.socialIcon} />
                        <Text>{link.platform}: {link.linked ? `Signed in as ${userInfo.name}` : 'Not signed in'}</Text>
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    icon: (selected) => ({
        backgroundColor: selected ? 'rgba(138, 43, 226, 0.2)' : 'transparent',
        padding: 10,
        borderRadius: 10,
    }),

    contentContainer: {
        paddingHorizontal: 20,
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
        backgroundColor: "#87CEEB",
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
        marginTop: 20,
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
});

export default ProfileScreen;
