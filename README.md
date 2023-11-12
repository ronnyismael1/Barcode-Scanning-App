# QR Code Scanning Application

This application is a robust solution for tracking physical assets using QR code scanning. It is built using React Native, a popular JavaScript framework for building cross-platform mobile applications. The application leverages the Expo Camera for QR code scanning, providing a seamless user experience.

## Technical Stack

- **React Native**: The application is built using React Native, which allows for the development of native mobile applications using JavaScript and React. The codebase is primarily JavaScript, with extensive use of modern React features such as Hooks for state management.

- **Expo Camera**: The application uses the Expo Camera module to implement QR code scanning. This module provides a wide range of camera functionality that is easy to interface with the rest of the React Native application.

- **Firebase Firestore**: Firebase Firestore is used for real-time data persistence. This allows the application to store and retrieve data in real-time, making it possible to track the current status and location of each board.

- **React Hooks**: React Hooks are used for state management within the application. This allows for dynamic data handling, making the application responsive and efficient.

- **React Native Gesture Handler**: This library is used to handle user gestures, providing a more interactive and responsive user interface.

## Application Architecture

The application follows a component-based architecture, which is a standard design pattern in React applications. This involves breaking down the application UI into smaller, reusable components, each of which manages its own state and logic.

The application's main functionality is contained within the `QRCodeScannerScreen` component. This component manages the application state using React Hooks, handles user interactions, and interfaces with the Expo Camera and Firebase Firestore.

The application also includes a variety of custom stylesheets for UI design, providing a consistent and attractive visual design across the entire application.

## Database Design

The application uses Firebase Firestore for its database. Each board has its own unique barcode, which is used as a key in the database. The associated data is stored in a sub-collection named by the serial number. This data includes the current location of the board and can be expanded to include additional fields as needed.

## Future Enhancements

The application is designed to be scalable and can be extended to include additional features as needed. Potential enhancements could include more detailed tracking information, additional user interaction features, and integration with other data sources or services.
