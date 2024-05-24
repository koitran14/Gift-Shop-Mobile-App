import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    useWindowDimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Colors, Images } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { ShopRoute } from "./ShopTabs/TabShop";
import { CategoriesRoute } from "./ShopTabs/TabCategories";
import { ProductRoute } from "./ShopTabs/TabProducts";
import { TabView, TabBar } from 'react-native-tab-view';
import { StoreService } from "../services";
import { Toast } from "toastify-react-native";

const ShopScreen = ({ route, navigation, user }) => {
    const { store } = route.params || {};
    const [isFollowed, setIsFollowed] = useState(false);
    const [searchText, setSearchText] = useState("");

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        const checkFollowing = store.followers?.some(follower => follower?._id.toString() === user._id.toString());
        setIsFollowed(checkFollowing)
    }, []);

    const [routes] = useState([
        { key: 'first', title: 'Shop', store: store },
        { key: 'second', title: 'Products', products: store.products },
        { key: 'third', title: 'Categories', products: store.products },
    ]);

    const renderScene = ({ route, navigation }) => {
        switch (route.key) {
          case 'first':
            return <ShopRoute route={route} navigation={navigation} />;
          case 'second':
            return <ProductRoute route={route} navigation={navigation} />;
          case 'third':
            return <CategoriesRoute route={route} navigation={navigation} />;
          default:
            return null;
        }
      };

    const renderTabBar = (props) => (
        <TabBar
          {...props}
          style={{ 
            backgroundColor: 'pink',
          }}
          indicatorStyle={{
            backgroundColor: 'purple',
          }}
          renderLabel={({ route, focused }) => (
            <Text style={{ color: focused ? 'purple' : 'grey', margin: 8, fontWeight: '600', fontSize: 14 }}>
              {route.title}
            </Text>
          )}
        />
      );

    const handleSearchSubmit = () => {
        searchText && navigation.navigate("SearchScreen", { searchParams: searchText });
    }

    const handleFollowing = async () => {
        try {
            if (!isFollowed) {
                const follow = await StoreService.followStore(store._id, user);
                Toast.success(follow.message, 'top');
            } else {
                const unfollow = await StoreService.unfollowStore(store._id, user);
                Toast.success(unfollow.message, 'top');
            }
        } catch (error) {
            Toast.error(error.message, 'top');
        } finally {
            setIsFollowed(!isFollowed)
        }
    }

    return (
        <LinearGradient
            colors={["rgba(231, 192, 248, 0.7)", "rgba(188, 204, 243, 0.7)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.linearGradient}
        >
            <Image style={styles.bannerImage} source={Images.FLOWERBANNER} />

            <View style={{ display: 'flex', flexDirection: 'column'}}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    width: '100%',
                    marginTop: 35,
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

                <View style={styles.storeInfo}>
                    {store && store.storeAvatar ? (
                        <Image style={styles.storeLogo} source={{ uri: store.storeAvatar }} />
                    ):(
                        <Image style={styles.storeLogo} source={Images.SUB} />
                    )}
                    <View style={{ display: 'flex', flexDirection: 'column', }}>
                        <Text style={styles.storeName}>{store.storeName ? store.storeName : "Unknown"}</Text>
                        <Text style={styles.storeStatus}>Online 2 minutes ago</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                            <Ionicons
                                name="globe"
                                size={20}
                                color='grey'
                            />
                            <Text style={{ fontWeight: '400', fontSize: 12, color: 'grey' }}>
                                {store?.storeLocation}
                            </Text>
                        </View>
                        <Text style={styles.storeRating}>
                            {' '}
                            4.9/5.0 | {store.followers.length}
                            {store.followers.length > 1 ? ' followers': ' follower'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleFollowing}>
                        { isFollowed ? (
                            <Text style={[styles.followButton,{ backgroundColor: '#fe3c3c', color: 'white'}]}>Following</Text>
                        ): (
                            <Text style={styles.followButton}>+ Follow</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

                <TabView
                    navigationState={{ index, routes }}
                    renderScene={({ route }) => renderScene({ route, navigation: navigation })}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
                
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        position: 'relative'
    },
    header: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 40,
        gap: 10,
    },
    backIcon: {
        marginTop: 20,
    },
    bannerImage: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
        position: 'absolute',
        top:0,
        left: 0,
        width: '100%'
    },
    scrollView: {
        flex: 1,
    },
    storeInfo: {
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    storeLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
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
    storeName: { 
        fontSize: 20,
        fontWeight: "700",
        color: "red",
        marginBottom: 5,
    },
    followButton: {
        fontSize: 18,
        fontWeight: "700",
        color: "rgba(206, 84, 84, 0.8)",
        borderColor: "#fe3c3c",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        textAlign: "center",
    },
    storeStatus: {
        fontSize: 14,
        color: "grey",
        marginBottom: 5,
        fontWeight: '500'
    },
    storeRating: {
        fontSize: 14,
        color: "black",
        fontWeight: '500',
        alignItems: 'center',
        marginTop: 5
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "700",
        width: '100%'
    },
    storeDescriptionTitle: {
        fontSize: 20,
        fontWeight: '600',
        paddingHorizontal: 20,
        paddingTop: 15,
        textDecorationLine: 'underline',
    },  
    storeDescription: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        fontSize: 15,
        lineHeight: 24,
        color: "#333",
    },
    storeImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    hotListTitle: {
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        marginVertical: 20,
    },
    productsContainer: {
        display: 'flex',
        paddingHorizontal: 10,
        paddingBottom: 20,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    column:{
        width: '100%',
        margin: 2,
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.generalState.user,
    };
};

export default connect(mapStateToProps)(ShopScreen);
