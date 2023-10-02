import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##fff8ef',
        alignItems: 'center',
        justifyContent: 'center',
      },
      maintext: {
        fontSize: 16,
        margin: 20,
      },
      barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 600,
        width: 370,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: 'tomato',
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      }
      
});
