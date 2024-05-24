import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { format, formatDistanceToNow } from 'date-fns';
import AntDesign from "react-native-vector-icons/AntDesign";

function shortenName(name) {
    if (name.length > 25) {
        return name.substring(0, 25) + '...';
    }
    return name;
}

const calculateTotalCost = (orders) => {
    let totalCost = 0;

    orders.forEach((item) => {
        const itemCost = item.product.price * item.quantity;
        totalCost += itemCost;
    });    

    return totalCost;
};

const OrderedItem = ({ order }) => {
    return (
        <View 
            style={{ 
                backgroundColor: 'white', 
                paddingVertical: 10, 
                paddingHorizontal: 20,
                borderRadius: 18,
                flexDirection: 'row',
                gap: 20,
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
            }}
        >
            <View>
                <Image source={{ uri: order.product?.productImage }} style={{ width: 60, height: 60, borderRadius: 5 }}/>
            </View>
            <View>
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'red'}}>{shortenName(order.product?.productName)}</Text>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'grey'}}>Price: {order.product?.price}</Text>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'grey'}}>Quantity: {order.quantity}</Text>
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 10, borderTopWidth: 0.5, paddingTop: 5, width: 180}}>Total Price: ${(order.product?.price * order.quantity).toFixed(2)}</Text>
            </View>
        </View>   
    )
}

const OrderedCard = ({ order, index }) => {   
    const [openList, setOpenList] = useState(false);
    const formattedDate = format(order.orderDate, 'dd/MM/yyyy')
    const getTimeDifference = formatDistanceToNow(order.orderDate, { addSuffix: true });
    const discount = order.voucher ? order.voucher.discount : 0
    return (
        <View style={styles.container}>
            <View 
                style={{ 
                    display: 'flex', 
                    gap: 15, 
                    borderRadius: 20, 
                    flexDirection: 'column',
                    marginVertical: 12,
                    width: '100%',
                }}
            >
                <TouchableOpacity 
                    style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 18, borderWidth: 1, borderColor: 'grey', borderRadius: 20, backgroundColor: 'white', 
                }} 
                    onPress={() => setOpenList(!openList)}
                >
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 16}}>
                        <Text style={{ fontSize: 40, fontWeight: '600', marginHorizontal: 8}}>{index}</Text>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: 'red' }}>{formattedDate}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: 'grey', marginBottom: 10 }}>{getTimeDifference}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: 'grey' }}>State: Success</Text>
                            {openList && (
                                <View>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'grey', marginBottom: 10}}>Method: {order.paymentMethod.paymentTitle}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'grey'}}>Cost: ${(calculateTotalCost(order.orderDetails)).toFixed(2)}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'grey'}}>Discount: -${
                                         (discount * (calculateTotalCost(order.orderDetails))).toFixed(2) 
                                    }</Text>

                                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 10, borderTopWidth: 0.5, paddingTop: 5, width: 200}}>Total Price:  {' '}
                                        {(calculateTotalCost(order.orderDetails)-discount * (calculateTotalCost(order.orderDetails))).toFixed(2)}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <AntDesign 
                        name={openList ? 'up' : 'down'}
                        size={20}
                        color={'black'}
                    />
                </TouchableOpacity>
                {openList && 
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        paddingHorizontal: 10,
                        paddingBottom: 15,
                    }}>
                        {order.orderDetails.map((order, index) => (
                            <View 
                                key={index}
                            >
                                <OrderedItem order={order}/>
                            </View>
                        ))}
                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 10,
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
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

export default OrderedCard;
