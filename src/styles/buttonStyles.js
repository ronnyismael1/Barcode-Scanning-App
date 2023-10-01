import { StyleSheet } from 'react-native';

export const buttons = StyleSheet.create({
      roundButton: {
        backgroundColor: 'tomato',
        borderRadius: 50, // Make it round by setting the border radius to half of the button's width/height
        paddingHorizontal: 20, // Adjust the padding as needed
        paddingVertical: 10,
        marginTop: 20, // Add spacing from the text above
      },
});
