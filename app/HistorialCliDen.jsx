import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { NotificationCard } from '../components/NotificationCard';
import { Footer } from '../components/Footer';


const HistorialCliDen = ({ navigation }) => {
  const notifications = [
    {
      id: 1,
      icon: require('../assets/images/alert.png'),
      title: 'Tu denuncia fue registrada',
      description: 'La denuncia por robo fue registrada correctamente.',
      date: '15/04/2025 - 5:45 p.m.',
    },
    {
      id: 2,
      icon: require('../assets/images/warning.png'),
      title: 'Incidente cercano',
      description: 'Se ha reportado un intento de robo cerca de tu ubicación.',
      date: '15/04/2025 - 5:00 p.m.',
    },
    {
      id: 3,
      icon: require('../assets/images/complaint.png'),
      title: 'Tu denuncia fue revisada',
      description: 'La PNP revisó tu denuncia N.º 0003',
      date: '09/04/2025 - 2:00 p.m.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
        <Header />

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Historial de Notificaciones</Text>
        {notifications.map((item) => (
          <NotificationCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            date={item.date}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FBF1',
  },
  scrollContainerHeader: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100, // para evitar solapamiento con el footer
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#012D1A',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
  },
  footerTextActive: {
    fontSize: 12,
    color: '#F9FF33',
    marginTop: 2,
  },
});

export default HistorialCliDen;