import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard'
import Tarefas from '../pages/Tarefas'

const App = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <App.Navigator 
      initialRouteName="Dashboard"
    >
      <App.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="view-dashboard" color="#000" size={30} />
          )
        }}
      />
      <App.Screen 
        name="Tarefas" 
        component={Tarefas} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="playlist-edit" color="#000" size={30} />
          )
        }}
      />
    </App.Navigator>
  )
}

export default AppRoutes;