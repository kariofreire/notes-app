import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Task from '../components/Task';
import { useNavigation } from '@react-navigation/native';
import SnackBar from 'react-native-snackbar-component';

import api from '../services/api';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  async function loadTasks() {
    const response = await api.get('/tasks');
    setTasks(response.data);
  }

  useEffect(() => {
    loadTasks()
  }, []);

  function navigateToAdd() {
    navigation.navigate('Add', { refresh: loadTasks});
  }

  function showSnackbar(message) {
    setMessage(message);
    setVisible(true);
  }

  async function deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`);
    showSnackbar(response.data.message);
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Task task={item} refresh={loadTasks} remove={deleteTask} showSnackbar={showSnackbar} />
        )}
        keyExtractor={item => String(item.id)}
      />

      <TouchableOpacity style={styles.button} onPress={navigateToAdd}>
        <MaterialIcons name="add-circle" color="#fff" size={20} />
        <Text style={styles.buttonText}>Adicionar nota</Text>
      </TouchableOpacity>

      <SnackBar 
        visible={visible} 
        textMessage={message} 
        actionHandler={() => setVisible(false)} 
        actionText="Fechar"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center'
  },
  button: {
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