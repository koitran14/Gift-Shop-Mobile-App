import { View, Text } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function NoResult() { 
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            height: 270,
        }}>
            <AntDesign 
                name='shoppingcart'
                size={150}
                color={'grey'}
                style={{ marginLeft: -20}}
            />
            <Text style={{ textAlign: 'center', fontWeight: '400', fontSize: 20, color: 'grey'}}>
                No result
            </Text>
        </View>
    )
}