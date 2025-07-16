import {
  Text,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


export function Header({color1, color2}){
    return(
              <LinearGradient 
                  colors={[color1, color2]} // colores del degradado
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                 
                  /* locations={[0, 1]} // ubicaciones del degradado */
                  style={styles.header} // aplica estilos al contenedor
                  >
                  <Text style={styles.logo}>SENTRIC</Text>

                  <Text style={styles.callText}>

                      📞 Marca 105. La Policía Está Lista Para Ayudarte

                  </Text>
              
              </LinearGradient>
    );
    
};
const styles = StyleSheet.create({
    header: {
      height: "13%",
      width: "100%", // Asegura que ocupe todo el ancho de la pantalla
      alignItems: "center",
      /* backgroundColor: "#004d28", // Fondo verde oscuro */
      justifyContent: 'center',

  },
  logo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  callText: {
    color: '#9FFFCB',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});


