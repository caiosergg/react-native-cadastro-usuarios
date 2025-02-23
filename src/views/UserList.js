import { Avatar, Button, Icon, ListItem } from "@rneui/themed";
import React from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

import users from "../data/users";

export default (props) => {
  function confirmUserDeletion(user) {
    Alert.alert("Excluir usuário", "Deseja excluir o usuário?", [
      {
        text: "Sim",
        onPress() {
          console.warn("DELETE" + user.id);
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function getActions(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    );
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem
        bottomDivider
        onPress={() => props.navigation.navigate("UserForm", user)}
      >
        <Avatar source={{ uri: user.avatarUrl }} rounded />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={users}
        renderItem={getUserItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
