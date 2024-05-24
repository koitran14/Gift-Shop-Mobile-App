import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors, Images } from "../contants"
import Ionicons from "react-native-vector-icons/Ionicons";

export const StoreCard = ({ store, navigation }) => {

    const visitStore = () => {
        navigation.navigate("ShopScreen", { store: store })
    }

    return(
        <View style={{
            display: 'flex',
            flexDirection:'row',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
            }}>
                {store?.storeAvatar ? (
                    <Image style={styles.storeLogo} source={{ uri: store.storeAvatar }} />
                ):(
                    <Image style={styles.storeLogo} source={Images.SUB} />
                )}
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Text style={{ fontWeight: '500', fontSize: 16, color: 'red', width: '100%' }}>
                        {store?.storeName ? store?.storeName : 'Unknown'}
                    </Text>
                    <Text style={{ fontWeight: '400', fontSize: 12, color: 'grey' }}>
                        Online 2 minutes ago
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <Ionicons
                            name="globe"
                            size={20}
                            color={Colors.DEFAULT_GREY}
                        />
                        <Text style={{ fontWeight: '400', fontSize: 12, color: 'grey' }}>
                            {store?.storeLocation}
                        </Text>
                    </View>
                </View>
            </View> 
            <TouchableOpacity 
                style={{ padding: 15, backgroundColor: 'pink', borderColor: 'red', borderRadius: 50}}
                onPress={visitStore}
            >
                <Text style={{ fontWeight: '500', paddingHorizontal: 5 }}>Visit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    storeLogo: {
        width: 70,
        height: 70,
        borderRadius: 40,
        alignItems: 'center'
    },
})