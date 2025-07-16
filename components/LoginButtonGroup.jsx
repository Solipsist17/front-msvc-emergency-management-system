import {StyleSheet, Text, Pressable, View } from 'react-native';
import { Link } from 'expo-router'
import { useNavigation } from '@react-navigation/native';

export function LoginOptions() {
    /* const navigation = useNavigation();

    const handleRegister = () => {
        navigation.navigate('Register');
    }

    const handleForgotPassword = () => {
        navigation.navigate('');
    } */


    return (
        <View style={styles.formContainer}>
            <Link href="/RegisterScreen" asChild>
                <Pressable> 
                    <Text style={styles.linkText}>Crear Una cuenta</Text>
                </Pressable>
            </Link>
            <Pressable>
                <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        alignItems: "center",
        height: 300, // Ajusta la altura según sea necesario
        width: "100%",
        /* backgroundColor: "white", // Fondo */
    },
    
    linkText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 2,
    },
});
