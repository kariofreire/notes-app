import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../services/api';

export default function EditTask() {
  const route = useRoute();
  const task = route.params.task;
  const refresh = route.params.refresh;
  const [text, setText] = useState(task.description);

  const navigation = useNavigation();

  async function handleClick() {
    const response = await api.patch(`/tasks/${task.id}`, { description: text });
    Alert.alert('Sucesso!', response.data.message);
    await refresh();
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
     <TextInput 
      style={styles.input}
      placeholder="atualizar tarefa"
      onChangeText={text => setText(text)}
      value={text}
    />
    <TouchableOpacity style={styles.button} onPress={handleClick}>
      <MaterialIcons name="loop" color="#fff" size={20} />
      <Text style={styles.buttonText}>atualizar</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 'auto',
  },
  button: {
    alignSelf: 'center',
    width: 180,
    height: 40,
    backgroundColor: '#2980B9',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  }
});