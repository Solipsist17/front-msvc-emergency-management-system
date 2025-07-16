import {  
    View,
  Text,
  StyleSheet,
  ScrollView, } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { Shield } from '../components/Shield';
import { ButtonSOS } from '../components/ButtonSOS';
import { Footer } from '../components/Footer';


const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
                <Header color1={"green"} color2={"black"}/>
                <Shield height={150} width={150}/>
      {/* Contenido */}
            <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.emergencyTitle}>¿Tienes una emergencia?</Text>
            <Text style={styles.emergencySubtitle}>Presiona el botón para especificar y enviar una alerta</Text>

            {/* Botón SOS */}
            <ButtonSOS />

            {/* Opciones */}
            
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7f2',
  },
    scrollContainerHeader:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
  
  },
    header: {
        backgroundColor: '#012D1A',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
    },
    logo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    badge: {
        width: 40,
        height: 40,
        marginRight: 10,
     },
    userInfo: {
        flex: 1,
    },
    welcomeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    phoneText: {
        color: '#ccc',
        fontSize: 12,
    },
    notificationIcon: {
        marginLeft: 10,
     },
    content: {
        alignItems: 'center',
        padding: 20,
    },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  sosButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#D30000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D30000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    marginBottom: 30,
  },
  sosText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  securitySubtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionCard: {
    backgroundColor: '#fff',
    width: '47%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  optionText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
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
export default HomeScreen;