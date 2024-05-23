import { View, Text, ScrollView, StyleSheet } from "react-native"
import { Accordion } from "../../components/Accordion";
import { useEffect, useState } from "react";
import { CategoryService } from "../../services";

export const CategoriesRoute = ({ route, navigation }) => {    
    const { products } = route;
    const  [categories, setCategories] = useState([]);


    useEffect(() => {
        const getCategories = async() => {
            let response = await CategoryService.getAllCategories();
            const categoriesWithProducts = response.filter(category =>
                products.some(product => product.category.categoryName === category.categoryName)
            );

            setCategories(categoriesWithProducts);
        }
        getCategories();
    })

    return (
        <ScrollView>
            <View style={styles.container}>
                <Accordion categories={categories} products={products} navigation={navigation}/>
            </View>
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