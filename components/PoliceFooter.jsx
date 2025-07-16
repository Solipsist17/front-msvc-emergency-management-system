import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
export const PoliceFooter = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.footer}>
          <Link href="/PoliceScreen" asChild>
          <Pressable style={styles.footerItem}>
              <Ionicons name="home-outline" size={24} color="yellow" />
              <Text style={styles.footerLabelActive}>Inicio</Text>
          </Pressable>
          </Link>

          <Link href="/PoliceInfoScreen" asChild>
            <Pressable style={styles.footerItem}>
                <Ionicons name="person-outline" size={24} color="#fff" />
                <Text style={styles.footerLabel}>Perfil</Text>
            </Pressable>
          </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#043927',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  footerItem: { alignItems: 'center' },
  footerLabel: { color: '#fff', fontSize: 12 },
  footerLabelActive: { color: 'yellow', fontSize: 12 },
});