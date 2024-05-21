import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

export default function ProductCard ({ product, onPress}) {

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{uri: product.productImage}} style={styles.cardImage} />
                <Text style={styles.cardName}>{product.productName}</Text>
                <Text style={styles.cardCategory}>{product.category.categoryName}</Text>
                <View style={{
                    height: 1,
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    marginVertical: 10,
                }}/>
                <Text style={styles.cardPrice}>$ {product.price}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fffdfd",
        width: "49.5%",
        borderRadius: 12,
        borderColor: "white",
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    cardImage: {
        width: '100%',
        objectFit: 'cover',
        height: 160,
        marginBottom: 10,
        borderRadius: 10,
    },
    cardName: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "600",
    },
    cardCategory: {
        color: 'orange',
        fontSize: 16,
        fontWeight: '700',
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: '400',
    }
})