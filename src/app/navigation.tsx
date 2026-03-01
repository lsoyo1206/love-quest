import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from './routes';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import LevelScreen from '../screens/LevelScreen';
import FinalBossScreen from '../screens/FinalBossScreen';
import EndingScreen from '../screens/EndingScreen';
import InventoryScreen from '../screens/InventoryScreen';


export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Level: { level: 1 | 2 | 3 | 4 };
  FinalBoss: undefined;
  Inventory: undefined;
  Ending: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.Home} component={HomeScreen} />
        <Stack.Screen name={ROUTES.Map} component={MapScreen} />
        <Stack.Screen name={ROUTES.Level} component={LevelScreen} />
        <Stack.Screen name={ROUTES.FinalBoss} component={FinalBossScreen} />
        <Stack.Screen name={ROUTES.Inventory} component={InventoryScreen} />
        <Stack.Screen name={ROUTES.Ending} component={EndingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}