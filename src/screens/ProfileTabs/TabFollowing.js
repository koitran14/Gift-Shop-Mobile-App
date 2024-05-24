import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react";
import { StoreService } from "../../services";
import { StoreCard } from "../../components/StoreCard";

export const FollowingRoute = ({ route, navigation }) => {    
    const { user } = route;
    const  [following, setFollowing] = useState([]);

    useEffect(() => {
        const req = async() =>{
            const res = await StoreService.getFollowingStores(user._id);
            setFollowing(res);
        }
        req();
    },[])

    return (
        <ScrollView >
            <View style={styles.container}>
                <Text style={{ paddingLeft: 20, fontSize: 24, fontWeight: '500'}}>Following ({following.length})</Text>
                {following.map((store, index) => (
                    <View key={index} style={{ paddingHorizontal: 5}}>
                        <StoreCard store={store} navigation={navigation}/>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
    }
})