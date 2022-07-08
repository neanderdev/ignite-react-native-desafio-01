import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taksWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (taksWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks];

    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem) return;

    foundItem.done = !foundItem?.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: "cancel",
        text: "Não"
      },
      {
        style: "destructive",
        text: "Sim",
        onPress: () => {
          setTasks(oldState => oldState.filter(
            task => task.id !== id
          ));
        }
      }
    ]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = [...tasks];

    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId);

    if (!taskToBeUpdated) return;

    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})