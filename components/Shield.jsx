import {Image, StyleSheet, Text, View } from 'react-native';

export function Shield({height, width}) {
    return(
        
        <View style={styles.logoContainer}>
                <Image
                source={require('../assets/images/escudo.png')} // Asegúrate de colocar la imagen en la carpeta /assets
                style={[styles.logoImage, {height: height, width: width}]} // Ajusta el tamaño del logo según las props
                resizeMode="contain"
                />
        </View>
    );
};
    const styles = StyleSheet.create({
        logoImage: {
            width: "40%", // Ajusta el tamaño del logo
            height: "95%",
            resizeMode: "contain", // Mantiene las proporciones del logo
        },
        logoContainer: {
            alignItems: "center",
            marginTop: 10, // Espacio superior para centrar el logo
           /*  marginBottom: 10, */ // Espacio inferior para centrar el logo 
           /*  height: 300, */ // Ajusta la altura según sea necesario
           /*  width: "100%", */
        }
  },
);
    