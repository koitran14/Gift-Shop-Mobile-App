import { View, Text, StyleSheet, Image, ScrollView } from "react-native"
import { Colors, Images } from "../../contants";
import { ProductCard } from "../../components";

export const ShopRoute = ({ navigation, route }) => {   
    const { store } = route;
    return (
        <ScrollView>
            <View>
                <Text style={styles.storeDescriptionTitle}>DESCRIPTION:</Text>
                <Text style={styles.storeDescription}>
                    {store?.storeDescription}
                </Text>
            </View>
            <Image style={styles.storeImage} source={Images.FLOWER1} />

            <Text style={styles.hotListTitle}>HOT LIST</Text>
            <View style={styles.productsContainer}>
                <View style={styles.row}>
                    {store.products?.map((item) => (
                        <View key={item._id} style={styles.column}>
                            <ProductCard product={item} onPress={() => navigation.navigate('ProductScreen', {product: item})} />
                        </View>
                    ))}
                    {!store.products && <Text>Not found</Text>}
                </View>
            </View>
        </ScrollView>
    )
}

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
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
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
        color: "purple",
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
        marginBottom: 5,
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
        fontWeight: '500'
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