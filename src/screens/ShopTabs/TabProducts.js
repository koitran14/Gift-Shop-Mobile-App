import { View, Text, ScrollView, StyleSheet } from "react-native"
import { ProductCard } from "../../components";

export const ProductRoute = ({ route, navigation }) => {
    const { products } = route;
    return (
        <ScrollView style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
        }}>
           <View style={styles.row}>
                {products?.map((item) => (
                    <View key={item._id} style={styles.column}>
                        <ProductCard product={item} onPress={() => navigation.navigate('ProductScreen', {product: item})} />
                    </View>
                ))}
                {!products && <Text>Not found</Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    column:{
        width: '100%',
        margin: 2,
    }
})