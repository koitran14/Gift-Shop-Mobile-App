import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CartItem = ({ userId, productId, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        const response = await updateQuantity(userId, productId, quantity);
  
        if (response.status === 200) {
          setQuantity(response.data.quantity);
        } else {
          Alert.alert("Error", "Failed to update quantity");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to update quantity");
      }
    };

    updateQuantity();
  }, [quantity])

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      Alert.alert("Error", "Quantity cannot be less than 1");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="-" onPress={decreaseQuantity} />
      <Text style={styles.quantityText}>{quantity}</Text>
      <Button title="+" onPress={increaseQuantity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 18,
  },
});

export default CartItem;
