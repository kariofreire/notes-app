import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

export default function Task({task, remove, showSnackbar, refresh}) {
  const [completed, setCompleted] = useState(task.completed);
  const decoration = { textDecorationLine: completed ? 'line-through' : 'none' };

  const navigation = useNavigation();

  async function handleChange(value) {
    const response = await api.patch(`/tasks/${task.id}`, { completed: value });
    showSnackbar(response.data.message);
    setCompleted(value);
  }

  function navigateToEdit(task) {
    navigation.navigate('Edit', { task, refresh });
  }

  return (
    <View style={styles.task}>
      <View style={styles.taskItem}>
        <CheckBox onValueChange={handleChange} value={completed}/>
        <Text style={[styles.taskTitle, decoration]}>{task.description}</Text>
      </View>
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => navigateToEdit(task)}>
          <MaterialIcons name="edit" size={20} color="#F39C12"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => remove(task.id)} style={{ marginLeft: 5 }}>
          <MaterialIcons name="delete" color="#E74C3C" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: 300,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },  
  taskTitle: {
    fontSize: 15,
    fontWeight: '300',
    marginRight: 10,
  }
});