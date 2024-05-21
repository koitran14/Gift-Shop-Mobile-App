import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FeedbackCard() {
    return (
        <View style={{
            display: 'flex',
            flexDirection:'row',
            gap: 20,
            backgroundColor: '#f8f8f8',
            borderRadius: 10,
            padding: 15,
            alignItems: 'flex-start',
        }}>
            <View style={{ height: 50, width: 50, backgroundColor: 'lightgrey', borderRadius: 9999}}></View>
            <View>
                <Text style={{ fontSize: 14, fontWeight: '600'}}>Username</Text>
                <View style={{ marginTop: 1,display: 'flex', flexDirection: 'row', gap: 4, alignItems:'center'}}>
                    <Ionicons name="star" size={14} color={'orange'}/>
                    <Ionicons name="star" size={14} color={'orange'}/>
                    <Ionicons name="star" size={14} color={'orange'}/>
                    <Ionicons name="star" size={14} color={'orange'}/>
                    <Ionicons name="star" size={14} color={'orange'}/>
                </View>
                <View style={{
                    marginTop: 5,
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                    }}>
                        Feedback Description
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        marginTop: 7,
                        color: 'grey'
                    }}>
                        03-04-2023 09:15
                    </Text>
                </View>
            </View>
        </View>
    )
}