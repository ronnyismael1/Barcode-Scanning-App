import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../styles/commonStyles';
import { buttons } from '../styles/buttonStyles';

export default function QRCodeScannerScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Point to Scan')

    const askForCameraPermission = () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // setText(data)
        setText(<Text style={{ fontWeight: 'bold' }}>{data}</Text>)
        console.log('Type: ' + type + '\nData: ' + data) // Output data to console
    };
    
    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
        <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }

    // Return the View
    return (
        // Return screen
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 200, width: 370 }} />
                </View>
            <Text style={styles.maintext}>{text}</Text>

            {/* Defining button to scan again */}
            {scanned && (
                <TouchableOpacity
                    style={buttons.roundButton}
                    onPress={() => setScanned(false)}
                >
                    <Text style={{ color: 'white' }}>Scan again?</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
