import React from 'react';
import { View, Button } from 'react-native';
import { styles } from '../styles/commonStyles';
import {containers } from '../styles/containers';

export default function HomeScreen({ navigation }) {
    const handleScanNowPress = () => {
        navigation.navigate('QRCodeScanner');
    };
    
    return ( 
        <View style={containers.container}>
            <Button title="Scan Now" onPress={handleScanNowPress} />
        </View>
    )
}
