import { View, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts } from "../contants";

export default function FavoriteScreen ({ navigation }) {
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
                            marginRight: 70,
                        }}
                    />
                    <Text style={{
                        alignContent: 'center', // Center the text horizontally
                        color: Colors.DEFAULT_BLACK,
                        fontWeight: 800,
                        fontSize: 22,
                        lineHeight: 16 * 1.4,
                        fontFamily: Fonts.POPPINS_MEDIUM,
                    }}>
                        Favorite Screen
                    </Text>
                </View>
            </View>
        </LinearGradient>
    )
}