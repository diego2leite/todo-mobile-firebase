import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { 
  Title, 
  Resumo, 
  ResumoText,
  ResumoTextParagraph,
  ResumoTextParagraphBold,
  LogoutButton,
  LogoutButtonText
} from './styles';

import firebase from 'firebase';
import 'firebase/firestore';

const Dashboard = () => {
  const isFocused = useIsFocused();
  const { signOut } = useAuth();
  
  const [tasks, setTasks] = useState([]);

  const tasks_qtd = useMemo(() => tasks.length, [tasks]);

  const tasks_concluded_qtd = useMemo(
    () => {
      const filtered = tasks.filter(task => {
        return task.concluido === true;
      })

      return filtered.length;
    },
    [tasks],
  )

  const loadTasks = useCallback(
    async () => {
      try {
        const response = await firebase.firestore().collection('tarefas').get();
        
        const temp = [];

        response.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          temp.push({id: doc.id, ...doc.data()});
        })

        console.log(temp);

        setTasks(temp);
      } catch (error) {
        console.log('error loadTasks', error);
      }
  },[]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks, isFocused || false]);

  return (
    <>
      <Title>Resumo</Title>

      <Resumo>
        { tasks_qtd - tasks_concluded_qtd === 0 ? (
          <ResumoText>Parabéns! Você concluiu todas as tarefas!</ResumoText>
        ) : (
          <ResumoText>Existem {tasks_qtd - tasks_concluded_qtd} tarefas pendentes.</ResumoText>
        )}

        <ResumoTextParagraph>
          <ResumoTextParagraphBold>Total de tarefas:</ResumoTextParagraphBold> {tasks_qtd}
        </ResumoTextParagraph>

        <ResumoTextParagraph>
          <ResumoTextParagraphBold>Tarefas concluídas:</ResumoTextParagraphBold> {tasks_concluded_qtd}
        </ResumoTextParagraph>

        <LogoutButton onPress={() => signOut()}>
            <LogoutButtonText>
              Sair
            </LogoutButtonText>
        </LogoutButton>

      </Resumo>
    </>
  )
}

export default Dashboard;