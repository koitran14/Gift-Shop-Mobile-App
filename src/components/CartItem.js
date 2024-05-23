import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../contants';
import { CheckBox } from 'react-native-elements';

const CartItem = ({ cart, onAdd, onRemove, isSelected, handleSelection }) => {
    function shortenName(name) {
        if (name.length > 16) {
            return name.substring(0, 16) + '...';
        }
        return name;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: cart.product.productImage }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{shortenName(cart.product.productName)}</Text>
                <Text style={styles.price}>{cart.product.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => onRemove(cart)}>
                        <Ionicons name="remove-circle-outline" size={24} color={'grey'} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{cart.quantity}</Text>
                    <TouchableOpacity onPress={() => onAdd(cart)}>
                        <Ionicons name="add-circle-outline" size={24} color={'grey'} />
                    </TouchableOpacity>
                </View>
            </View>
            <CheckBox
                checked={isSelected}
                onPress={handleSelection}
                checkedColor={'red'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10,
        alignItems: 'flex-start',
        gap: 16,
    },
    imageContainer: {
        paddingHorizontal: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: 'black',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 10,
    },
});

export default CartItem;
