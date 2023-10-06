import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';

import { styles } from '../styles/commonStyles';
import { buttons } from '../styles/buttons';
import { containers } from '../styles/containers';

import { db } from '../../Firebase/firebase';
import { doc, setDoc, addDoc } from  'firebase/firestore';

export default function QRCodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');  // For saving the SN of the board (number value)
  const [location, setLocation] = useState('');
  const [zoom, setZoom] = useState(0);
  const [scannedSerialNumbers, setScannedSerialNumbers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

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
    // Check if the serial number is already scanned
    if (!scannedSerialNumbers.includes(data)) {
        setScannedSerialNumbers(prevNumbers => [...prevNumbers, data]);
    }
  };

  // Handle pinch gestures to change zoom
  const changeZoom = (event) => {
    let newZoom;
    if (event.nativeEvent.scale > 1) {
      newZoom = zoom + 0.001;
    } else {
      newZoom = zoom - 0.005;
    }
    // Clamp the zoom level to [0, 1]
    setZoom(Math.min(1, Math.max(0, newZoom)));
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={containers.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={containers.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <TouchableOpacity style={buttons.roundButton} onPress={askForCameraPermission}>
          <Text style={{ color: 'white' }}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // For questionaire
  const handleAnswer = (question, answer) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [question]: answer }));
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };
    const goBackward = () => {
      setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1));
  };
  const goForward = () => {
    const TOTAL_QUESTIONS = 2; // Restrict forward button from endlessly continuing
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }  
  };
  const handleDiscard = () => {
      // Logic to discard the answers
      setAnswers({});
      setCurrentQuestionIndex(0);
  };
  const handleSubmit = async () => {
    try {
      const subCollectionRef = doc(db, 'A0-SA7-Boards', 'rma-here', 'serial-numbers',data);   // Path to sub-collection named by the serial number
      await setDoc(subCollectionRef, {
        location: 'TEST' // Change this to not be constant
        // add more fields as we expand
      });
      console.log('Data added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    // Reset the input and close the modal
    setLocation('');
    handleCloseModal();
  };

  // Main return for scanning and displaying modal
  return (
    <View style={containers.parent}>

      {/* Container for Camera */}
      <PinchGestureHandler onGestureEvent={(event) => changeZoom(event)}>
        <View style={containers.containerCamera}>
          {/* Return screen with barcode scanner */}
          <View style={styles.barcodebox}>
            <Camera
              onBarCodeScanned={handleBarCodeScanned}
              style={{ height: 250, width: 380 }}
              zoom={zoom}
            />
          </View>
        </View>
      </PinchGestureHandler>

      {/* Container for Objects */}
      <View style={containers.containerObjects}>
        <Text style={{...styles.bolded, paddingLeft: 30, paddingBottom: 10}}>Scanned Serial Numbers...</Text>
        {scannedSerialNumbers.map((serialNumber, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <View style={styles.greenDot} />
            <Text style={styles.main}>{serialNumber}</Text>
          </View>
        ))}
      </View>

      {/* Container for Prompt */}
      <View style={containers.containerPrompt}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {/* Question: Location */}
            {currentQuestionIndex === 0 && (
              <View>
                <Text style={{...styles.bolded, paddingBottom: 20}}>Where is the board?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button title="FSI" onPress={() => handleAnswer('location', 'Location 1')} />
                  <Button title="BT" onPress={() => handleAnswer('location', 'Location 2')} />
                  <Button title="Prod." onPress={() => handleAnswer('location', 'Location 3')} />
                </View>
              </View>
            )}

            {/* More questions can be added similarly based on the `currentQuestionIndex` */}

            {/* After all questions */}
            {currentQuestionIndex === 1 && ( // Assuming there's only 1 question for now
              <View>
                <Button title="Submit?" onPress={handleSubmit} />
                <Button title="Discard" onPress={handleDiscard} />
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
      
      {/* Container for navigation */}
      <View style={containers.containerfb}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Navigation buttons */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={buttons.barrow} onPress={goBackward}>
              <Image source={require('../img/forwardArrow.png')} style={{ width: 45, height: 45, transform: [{ scaleX: -1 }] }} />
            </TouchableOpacity>
            <TouchableOpacity style={buttons.farrow} onPress={goForward}>
              <Image source={require('../img/forwardArrow.png')} style={{ width: 45, height: 45 }} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>             
      </View>
    </View>
  );
}
