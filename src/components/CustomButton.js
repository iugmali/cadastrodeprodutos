import {Pressable, StyleSheet, Text, View} from "react-native";

const CustomButton = ({children, onPress}) => {
  return (
    <View style={styles.buttonOutercontainer}>
      <Pressable
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer}
        onPress={onPress}
        android_ripple={{color: "#0f0f86"}}
      >
        <Text style={styles.buttonText}>
          {children}
        </Text>
      </Pressable>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  buttonOutercontainer: {
    borderRadius: 28,
    margin: 4,
    elevation: 2,
    overflow: "hidden"
  },
  buttonInnerContainer: {
    backgroundColor: "#4949b6",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
})
