import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from 'axios';
import Produto from "../components/Produto";

const Home = () => {
  const [products, setProducts] = useState([]);

  const route = useRoute();

  useEffect(() => {
    Axios.get("http://10.0.2.2:3000/products").then((res) => {
      setProducts(res.data)
    }).catch((erro) => alert("Erro ao requisitar produtos: " + erro))
  }, [route.params?.res])

  const navigation = useNavigation();

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
        <Text style={{ fontSize: 20 }}>Cadastro de Estoque</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={{ fontSize: 15, color: "blue" }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ padding: 20 }}
        keyExtractor={(item, index) => item.id}
        data={products}
        renderItem={({ item }) => (
          <Produto produto={item} />
        )} />
    </View>
  );
}

export default Home;
