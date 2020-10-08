import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import api from '../../services/api';
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
      const response = await api.get(`tarefas`);
      console.log("tarefas", response.data);
      setTasks(response.data);
    },[],
  );

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