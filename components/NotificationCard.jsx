import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function NotificationCard({ icon, title, description, date }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <View style={styles.textContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>NUEVO</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 12,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  labelContainer: {
    backgroundColor: '#116D2D',
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginBottom: 4,
  },
  labelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
});