import { StyleSheet } from 'react-native';

export const buttons = StyleSheet.create({
  roundButton: {
    backgroundColor: '#d20000',
    borderRadius: 50, // Make it round by setting the border radius to half of the button's width/height
    paddingHorizontal: 20, // Adjust the padding as needed
    paddingVertical: 10,
  },
  roundButtonblk: {
    backgroundColor: 'black',
    borderRadius: 50, // Make it round by setting the border radius to half of the button's width/height
    paddingHorizontal: 20, // Adjust the padding as needed
    paddingVertical: 10,
  },
  roundButtonRed: {
    backgroundColor: 'red',
    borderRadius: 50, // Make it round by setting the border radius to half of the button's width/height
    paddingHorizontal: 20, // Adjust the padding as needed
    paddingVertical: 10,
  },
  farrow: {
    position: 'absolute',
    bottom: 10, // distance from the bottom edge
    right: 10,  // distance from the left edge
  },
  barrow: {
    position: 'absolute',
    bottom: 10, // distance from the bottom edge
    left: 10,  // distance from the left edge
  },
});
