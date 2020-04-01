import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../services/api';

export default function AddTask() {
  const [newTask, setNewTask] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  async function handleClick() {
    if(!newTask) return Alert.alert('Falha no cadastro', 'Por favor preencha o campo!');
    const response = await api.post('/tasks', { description: newTask });
    Alert.alert('Sucesso!', response.data.message);
    await route.params.refresh();
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
     <TextInput 
      style={styles.input}
      placeholder="Adicione uma nova tarefa"
      onChangeText={text => setNewTask(text)}
      value={newTask}
    />
    <TouchableOpacity style={styles.button} onPress={handleClick}>
      <MaterialIcons name="add-circle" color="#fff" size={20} />
      <Text style={styles.buttonText}>Adicionar</Text>
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