import React, { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../contants";
import {
    View,
    Text,
    StyleSheet,
    Image,
    useWindowDimensions,
} from "react-native";
import { ProfileRoute } from "./ProfileTabs/TabProfile";
import { OrderingRoute } from "./ProfileTabs/TabOrdering";
import { FollowingRoute } from "./ProfileTabs/TabFollowing";
import { TabView, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux'

const ProfileScreen = ({ navigation, user }) => {
    const [index, setIndex] = React.useState(0);

    const [routes] = useState([
        { key: 'person', title: 'Profile', user: user, icon: 'person-outline' },
        { key: 'heart', title: 'Following', user: user,  icon: 'heart-outline' },
        { key: 'cube', title: 'Ordering', user: user, icon: 'cube-outline' },
    ]);

    const renderScene = ({route, navigation}) => {
        switch (route.key) {
            case 'person': return <ProfileRoute route={route} navigation={navigation}/>
            case 'heart': return <FollowingRoute route={route} navigation={navigation}/>
            case 'cube': return <OrderingRoute route={route} navigation={navigation}/>
            default: return null;;
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'purple' }}
            style={{ backgroundColor: 'white', paddingVertical: 5, }}
            renderIcon={({ route, focused }) => (
                <View>
                    <Ionicons name={route.icon} size={30} color={focused ? 'purple' : 'gray'} />
                </View>
            )}
            renderLabel={() => {}}
        />
    );

    return (
        <LinearGradient
            colors={['rgba(231, 192, 248, 0.7)', 'rgba(188, 204, 243, 0.7)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1, paddingTop: 40 }}
        >
            <View style={styles.header}>
                <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <View style={styles.profileDetails}>
                <Image source={Images.SUB} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>{user.username}</Text>
                    <Text style={styles.details}>{user.email}</Text>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: styles.scene.width }}
                renderTabBar={renderTabBar}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    icon: (selected) => ({
        backgroundColor: selected ? 'rgba(138, 43, 226, 0.2)' : 'transparent',
        padding: 10,
        borderRadius: 10,
    }),
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

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
        marginBottom: 20,
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
        color: 'red'
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

const mapStateToProps = (state) => {
    return {
        user: state.generalState.user,
    };
};

export default connect(mapStateToProps)(ProfileScreen);
