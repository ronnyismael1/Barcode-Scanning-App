import React from 'react';
import { View, Button } from 'react-native';
import { styles } from '../styles/commonStyles';

export default function HomeScreen({ navigation }) {
    const handleScanNowPress = () => {
        navigation.navigate('QRCodeScanner');
    };
    
    return ( 
        <View style={styles.container}>
            <Button title="Scan Now" onPress={handleScanNowPress} />
        </View>
    )
}
