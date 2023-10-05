import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { styles } from '../styles/commonStyles';
import { buttons } from '../styles/buttonStyles';
import { db } from '../../Firebase/firebase';
import { PinchGestureHandler } from 'react-native-gesture-handler';

export default function QRCodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');  // For saving the SN of the board (number value)
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState('');
  const [zoom, setZoom] = useState(0);

  // Function to ask for camera permission
  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
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
    // Reset 'scanned' after a short delay to allow for continuous zooming
    setTimeout(() => setScanned(false), 1000);
  };

  // Close the modal and reset state for another scan
  const handleCloseModal = () => {
    setShowModal(false);
    setScanned(false);
    setLocation(''); // Reset location input after closing the modal
  };

  // Handle the submission of data and location
  const handleSubmit = async () => {
    try {
      await db.collection('boards').add({
        serialNumber: data,
        location: location
      });
      console.log('Data added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    // Reset the input and close the modal
    setLocation('');
    handleCloseModal();
  };

  // Handle pinch gestures to change zoom
  const changeZoom = (event) => {
    let newZoom;
    if (event.nativeEvent.scale > 1) {
      newZoom = zoom + 0.005;
    } else {
      newZoom = zoom - 0.005;
    }
    // Clamp the zoom level to [0, 1]
    setZoom(Math.min(1, Math.max(0, newZoom)));
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
    <PinchGestureHandler onGestureEvent={(event) => changeZoom(event)}>
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

              {/* Insert picker here */}

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
        {/* Return screen with barcode scanner */}
        <View style={styles.barcodebox}>
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={{ height: 600, width: 370 }}
            zoom={zoom}
          />
        </View>
      </View>
    </PinchGestureHandler>
  );
}
