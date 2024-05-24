import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react";
import { NoResult, OrderedCard } from "../../components";
import OrderService from "../../services/OrderService";


export const OrderingRoute = ({ route }) => {    
    const { user } = route;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async() => {
            let response = await OrderService.getOrdersByUserId(user._id);
            setOrders(response);
        }
        getOrders();
    }, [])

    return (
        <ScrollView>
            {orders.length !== 0 ? (
                orders.map((order, index) => (
                    <View key={index}>
                        <OrderedCard order={order} index={index + 1}/>
                    </View>
                ))
            ):(
                <NoResult />
            )}
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