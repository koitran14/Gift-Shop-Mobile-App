import React from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import { Colors, General } from '../contants';
import { WelcomeCard } from '../components';

const WelcomeScreen = () => {
    return (
        <View style ={styles.container}>
            <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.DEFAULT_WHITE}
            translucent
            />
            <View style={styles.welcomeListContainer}>
                <FlatList
                    data={General.WELCOME_CONTENTS}
                    keyExtractor={item => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <WelcomeCard {...item} />}
                />
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        // alignCont,ent:'center',
        backgroundColor:Colors.DEFAULT_WHITE,
    },
});

export default WelcomeScreen;