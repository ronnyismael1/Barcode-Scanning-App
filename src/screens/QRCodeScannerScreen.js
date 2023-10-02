import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../styles/commonStyles';
import { buttons } from '../styles/buttonStyles';

export default function QRCodeScannerScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState('');  // For saving the SN of the board (number value)
    const [showModal, setShowModal] = useState(false);
    const [location, setLocation] = useState('');

    // Function to ask for camera permission
    const askForCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    // Request Camera Permission on component mount
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setData(data);  // save just the data (SN of the board)
        setShowModal(true); // Show the modal when QR code is scanned
    };

    // Close the modal and reset state for another scan
    const handleCloseModal = () => {
        setShowModal(false);
        setScanned(false);
        setLocation(''); // Reset location input after closing the modal
    }

    // Handle the submission of data and location
    const handleSubmit = () => {
        // Here you would integrate with Firebase
        console.log("SN:", data);
        console.log("Location:", location);

        // Reset the input and close the modal
        setLocation('');
        handleCloseModal();
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

    // Main return for scanning and displaying modal
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.maintext}>
                            <Text style={{ fontWeight: 'bold' }}>SN:</Text> {data}
                        </Text>

                        <TextInput
                            style={[
                                styles.textInputSquare, 
                                { 
                                    backgroundColor: 'gray', 
                                    padding: 14, // Increase padding
                                    borderRadius: 10, // Round the corners
                                    color: 'white',
                                }
                            ]}
                            placeholder="Enter location..."
                            placeholderTextColor="white" // Change placeholder color
                            value={location}
                            onChangeText={setLocation}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity
                                style={[buttons.roundButtonblk, { marginRight: 5 }]}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: 'white' }}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[buttons.roundButton, { marginLeft: 5 }]}
                                onPress={handleCloseModal}
                            >
                                <Text style={{ color: 'white' }}>Scan again?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Return screen */}
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 600, width: 370 }}
                />
            </View>
        </View>
    );
}
