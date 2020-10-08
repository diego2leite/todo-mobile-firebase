import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';

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

const Tarefas = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadTasks = useCallback(
    async () => {
      const response = await api.get(`tarefas`);
      setTasks(response.data);
    },[],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = useCallback(
    async () => {
      if(newTask === "") {
        setErrorMessage("Digite a tarefa a ser adicionada");
        return;
      }

      setErrorMessage("");

      const params = {
        descricao: newTask,
        concluido: false
      };

      try {
        await api.post(`tarefas`, params);  
        
        loadTasks();
        setNewTask("");
      } catch (error) {
        console.log("error handleAddTask:", error);

        setErrorMessage("Ocorreu um erro ao adicionar tarefa");
      }
    },[loadTasks, newTask],
  );

  const handleTask = useCallback(
    async (task) => {
      const params = {
        ...task,
        concluido: !task.concluido
      }
  
      await api.put(`tarefas/${task.id}`, params);
  
      loadTasks();
    },[loadTasks],
  );

  const removeTask = useCallback(
    async (task) => {
      await api.delete(`tarefas/${task.id}`);

      loadTasks();
    },[loadTasks],
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