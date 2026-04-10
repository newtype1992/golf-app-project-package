import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#102017'
        },
        headerTintColor: '#f8f2e7',
        headerTitleStyle: {
          fontWeight: '700'
        },
        sceneStyle: {
          backgroundColor: '#f4ecdf'
        },
        tabBarStyle: {
          backgroundColor: '#102017',
          borderTopColor: '#1e3a2a'
        },
        tabBarActiveTintColor: '#e3c177',
        tabBarInactiveTintColor: '#b9c5b8'
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Play',
          tabBarIcon: ({ color, size }) => <Ionicons name="golf" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="rounds"
        options={{
          title: 'Rounds',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="setup"
        options={{
          title: 'Setup',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
