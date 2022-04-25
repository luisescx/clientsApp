import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersonList } from '~/scenes';
import PersonForm from '~/scenes/PersonForm';

const { Navigator, Group, Screen } = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Navigator
      initialRouteName="PersonList"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="PersonList" component={PersonList} />

      <Group
        screenOptions={{
          presentation: 'fullScreenModal',
          headerShown: true,
        }}
      >
        <Screen
          name="PersonForm"
          component={PersonForm}
          options={{
            title: 'Cadastro Colaborador',
          }}
        />
      </Group>
    </Navigator>
  );
};

export default AppNavigation;
