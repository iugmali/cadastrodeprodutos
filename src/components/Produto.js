import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const Produto = ({produto}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Editar', { product: produto })} style={styles.container}>
      <Image
        source={{ uri: produto.img ? produto.img : null }}
        style={styles.image} />

      <View style={styles.details}>
        <Text>Produto: {produto.name}</Text>
        <Text>Descrição: {produto.description}</Text>
        <Text>Categoria: {produto.category}</Text>
        <Text>Preço: {produto.price}</Text>
        <Text>Quantidade: {produto.quantity}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Produto

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: 'white',
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100,
    margin: 10
  },
  details: {
    paddingHorizontal: 10,
    marginTop: 10
  }
})
