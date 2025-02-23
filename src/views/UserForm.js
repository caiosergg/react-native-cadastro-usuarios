import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

//components
import UsersContext from "../context/UsersContext";

export default ({ route, navigation }) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(UsersContext);
  return (
    <View style={style.form}>
      <Text>Nome</Text>
      <TextInput
        style={style.input}
        onChangeText={(name) => setUser({ ...user, name })}
        placeholder="Informe o nome"
        value={user.name}
      />
      <Text>Email</Text>
      <TextInput
        style={style.input}
        onChangeText={(email) => setUser({ ...user, email })}
        placeholder="Informe o email"
        value={user.email}
      />
      <Text>URL do Avatar</Text>
      <TextInput
        style={style.input}
        onChangeText={(avatarUrl) => setUser({ ...user, avatarUrl })}
        placeholder="Informe a URL do Avatar"
        value={user.avatarUrl}
      />
      <Button
        title="Salvar"
        onPress={() => {
          /*decide se cria ou atualiza um usuário*/
          dispatch({
            type: user.id ? "updateUser" : "createUser", //verificar se é edição ou criação de usuário
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    padding: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
  },
});
