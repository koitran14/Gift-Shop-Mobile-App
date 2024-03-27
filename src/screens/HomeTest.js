import { View, Text, StyleSheet } from "react-native";

const HomeTest = () => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',
        height: '100%',
    }
})

export default HomeTest;