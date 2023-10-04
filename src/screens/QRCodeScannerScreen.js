import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { styles } from '../styles/commonStyles';
import { buttons } from '../styles/buttonStyles';
import { db } from '../../Firebase/firebase';
import { RNCamera } from 'react-native-camera';

export default function QRCodeScannerScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState('');
    
    // Function to ask for camera permission
    const askForCameraPermission = async () => {
        try {
            const { status } = await RNCamera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        } catch (error) {
            console.error('Error while requesting camera permission:', error);
        }
    };

    // Request Camera Permission on component mount
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setData(data);  // save just the data (SN of the board)
        console.log(data);
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <TouchableOpacity style={buttons.roundButton} onPress={askForCameraPermission}>
                    <Text style={{ color: 'white' }}>Allow Camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RNCamera
                style={{
                    flex: 1,
                    width: '100%',
                }}
                onBarCodeRead={handleQRCodeScanned} // Use onBarCodeRead for QR code scanning
            />
            {scanned && (
                <View style={styles.container}>
                    <Text>Data: {data}</Text>
                </View>
            )}
        </View>
    );
}
