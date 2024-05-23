import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const VoucherCard = ({ voucher, isSelected, handleSelection }) => {
    function shortenName(name) {
        if (name.length > 16) {
            return name.substring(0, 16) + '...';
        }
        return name;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{shortenName(voucher.voucherTitle)}</Text>
                <Text style={styles.discount}>-{voucher.discount * 100}%</Text>
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
        backgroundColor: '#F9E5E5',
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    discount: {
        fontSize: 25,
        color: 'red',
        fontWeight: 'bold',
    }
});

export default VoucherCard;
