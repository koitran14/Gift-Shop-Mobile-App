import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const HorizontalProductCard = ({ product, navigation }) => {
    
    const onPress = (selectedProduct) => {
        navigation.navigate('ProductScreen', { product: selectedProduct });
    }

    return (
        <TouchableOpacity onPress={() => onPress(product)} style={styles.horizontalCard}>
            <Image style={styles.productImg} source={{ uri: product.productImage}}/>
            <View style={{ display: 'flex', flexDirection: 'column'}}>
                <Text style={styles.productTitle}>{product.productName}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
            </View>
        </TouchableOpacity>
    )
}


export const Accordion = ({ categories, products, navigation }) => {
    const [openCategory, setOpenCategory] = useState();
    const [filteredProducts, setFilteredProducts] = useState([]);

    const toggleCategory = (categoryName) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    const getProductCount = (categoryName) => {
        const categoryProducts = products.filter((product) => product.category.categoryName === categoryName);
        return categoryProducts.length;
    }

    useEffect(() => {
        const filtered = products.filter((product) => product.category.categoryName === openCategory);
        setFilteredProducts(filtered);
    }, [openCategory])
  
    return (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 15, paddingHorizontal: 5,}}>
            {categories.map((category) => (
                <View key={category._id}>
                    <TouchableOpacity disabled={getProductCount(category.categoryName) === 0} onPress={() => toggleCategory(category.categoryName)} style={styles.categoryHeader}>
                        <Text style={styles.categoryTitle}>{category.categoryName} ({getProductCount(category.categoryName)})</Text>
                        <AntDesign 
                            name={openCategory === category.categoryName ? 'up' : 'down'}
                            size={20}
                            color={'black'}
                        />
                    </TouchableOpacity>
                    {openCategory === category.categoryName && filteredProducts && (
                        <View style={styles.productsList}>
                            {filteredProducts.map((product, index) => (
                                <View key={index} style={styles.productCardContainer}>
                                    <HorizontalProductCard product={product} navigation={navigation}/>
                                </View>
                            ))} 
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    categoryHeader: {
      padding: 20,
      backgroundColor: 'lightyellow',
      marginTop: 10,
      borderRadius: 25,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fb6f92',
    },
    productsList: {
      padding: 12,
      display: 'flex',
    },
    productCardContainer: {
      marginBottom: 10,
    },
    horizontalCard: {
        padding: 20,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    productImg: {
        width: 50,
        height: 50,
        borderRadius: 9999,
        objectFit: 'cover',
    },
    productTitle: {
        fontSize: 16,
        color: 'red',
        fontWeight: '600'
    },
    productPrice: {
        fontSize: 12,
        fontWeight: '400',
    }
  });