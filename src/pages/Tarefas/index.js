import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { 
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  FormAddNewTask,
  Tasks,
  Task,
  TaskText,
  TaskAction,
  ErroMessage
} from './styles';

import firebase from 'firebase';
import 'firebase/firestore';

const Tarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const onTarefasChanged = useCallback(snap => {
    const data = snap.docs.map(doc => ({id: doc.id, ...doc.data()}));

    console.log('snapshot', data);
    setTasks(data);
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('tarefas').onSnapshot(onTarefasChanged);

    return () => unsubscribe();
  }, []);

  const handleAddTask = useCallback(
    async () => {
      if(newTask === "") {
        setErrorMessage("Digite a tarefa a ser adicionada");
        return;
      }

      setErrorMessage("");

      try {
        await firebase.firestore().collection('tarefas').add({
          descricao: newTask,
          concluido: false
        });
        
        setNewTask("");
      } catch (error) {
        console.log("error handleAddTask:", error);

        setErrorMessage("Ocorreu um erro ao adicionar tarefa");
      }
    },[newTask],
  );

  const handleTask = useCallback(
    async (task) => {
      await firebase.firestore().collection('tarefas').doc(task.id).set({
        ...task,
        concluido: !task.concluido
      },{merge: true});
  
    },[],
  );

  const removeTask = useCallback(
    async (task) => {
      // await api.delete(`tarefas/${task.id}`);

      await firebase.firestore().collection('tarefas').doc(task.id).delete();

    },[],
  );

  return (
    <Container>
      <Title>Lista de Tarefas</Title>

      <FormAddNewTask>
        <Input 
          value={newTask}
          onChangeText={text => setNewTask(text)}
          placeholder="Digite a nova tarefa..."
        />

        <Button onPress={() => handleAddTask()}>
          <ButtonText>
              Criar
          </ButtonText>
        </Button>
      </FormAddNewTask>

      { !!errorMessage && (
        <ErroMessage>{errorMessage}</ErroMessage>
      )}

      <Tasks>
        { tasks.map(task => (
          <Task key={task.id}>
            <TaskText>{task.descricao}</TaskText>

            <TaskAction>
              { task.concluido ? (
                <>
                  <MaterialCommunityIcons 
                    name="delete-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => removeTask(task)}
                  />
                  <MaterialCommunityIcons 
                    name="check-circle-outline"
                    color="#3a3a3a"
                    size={22}
                    onPress={() => handleTask(task)}
                  />
                </>
              ) : (
                <MaterialCommunityIcons 
                  name="circle-outline"
                  color="#3a3a3a"
                  size={22}
                  onPress={() => handleTask(task)}
                />
              )}
              
            </TaskAction>
          </Task>
        ))
        }
      </Tasks>
    </Container>
  )
}

export default Tarefas;