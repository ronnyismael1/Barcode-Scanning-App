import { StyleSheet } from 'react-native';

export const containers = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCamera: {
    flex: 1,
    backgroundColor: 'white', // #fff8ef
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  containerObjects: {
    flex: 1.3,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerPrompt: {
    flex: 1.3,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 40,
  },
});