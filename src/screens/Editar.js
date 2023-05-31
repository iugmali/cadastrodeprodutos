import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Button, Image, Text, StyleSheet, ScrollView } from "react-native";

import ImagePicker from 'react-native-image-picker';

import { useNavigation, useRoute } from '@react-navigation/native';

import Axios from 'axios';
import CustomButton from "../components/CustomButton";

const Editar = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [img, setImg] = useState('');
  const [id, setId] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;

  useEffect(() => {
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
    setImg(product.img);
    setId(product.id);
  }, [product])

  const saveProduct = () => {
    if (name.trim() === "") {
      alert("Nome não pode estar vazio")
    } else {
      Axios.patch('http://10.0.2.2:3000/products/' + id, {
        name,
        description,
        category,
        quantity,
        price,
        img
      }).then((res) => {
        alert("Salvo com sucesso!")
        navigation.navigate('Home', { res })
      }).catch(() => alert("Erro ao salvar"))
    }
  }

  const deleteProduct = () => {
    Axios.delete('http://10.0.2.2:3000/products/' + id).then((res) => {
      alert("Deletado com sucesso!")
      navigation.navigate('Home', { res })
    }).catch(() => alert("Erro ao salvar"))
  }

  const pickImageHandler = () => {
    ImagePicker.launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    }, (res) => {
      if (res.assets !== undefined) {
        setImg(res.assets[0].uri)
      }
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img ? img : null }} style={styles.image} />
      </View>

      <CustomButton onPress={pickImageHandler}>
        Carregar imagem
      </CustomButton>

      <TextInput
        value={name}
        onChangeText={(txt) => setName(txt)}
        placeholder="Nome"
        style={styles.textInput}
        placeholderTextColor="#5a5a5a" />
      <TextInput
        value={description}
        onChangeText={(txt) => setDescription(txt)}
        placeholder="Descrição"
        style={styles.textInput}
        placeholderTextColor="#5a5a5a" />
      <TextInput
        value={category}
        onChangeText={(txt) => setCategory(txt)}
        placeholder="Categoria"
        style={styles.textInput}
        placeholderTextColor="#5a5a5a" />
      <TextInput
        keyboardType={"number-pad"}
        value={quantity}
        onChangeText={(txt) => setQuantity(txt)}
        placeholder="Quantidade"
        style={styles.textInput}
        placeholderTextColor="#5a5a5a" />
      <TextInput
        keyboardType={"number-pad"}
        value={price}
        onChangeText={(txt) => setPrice(txt)}
        placeholder="Preço"
        style={styles.textInput}
        placeholderTextColor="#5a5a5a" />

      <CustomButton onPress={saveProduct}>Salvar</CustomButton>
      <CustomButton onPress={deleteProduct}>Deletar</CustomButton>
    </ScrollView>
  )
}

export default Editar;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    fontSize: 16,
    marginTop: 10,
    borderWidth: 1,
    width: '100%',
    height: 50,
    borderRadius: 10,
    padding: 7,
  },
  imageContainer: {
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#545454',
    borderWidth: 1
  }
})
