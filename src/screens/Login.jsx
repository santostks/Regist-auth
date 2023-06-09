import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSafeAreaInsets }
    from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, 
         Image, TextInput, Alert } from 'react-native'
import themes from '../themes'
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'


export default function Login() {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [efetuandoLogin, setEfetuandoLogin] = useState(false)
    
    function handleLogin() {
        //Efetuando as validações básicas do form
        if(email === '' || senha ===''){
            Alert.alert('Atenção',
            'Informe um email e senha para realizar o login')
            return
        }
        if(senha.length < 6){
            Alert.alert('Atenção',
            'A senha informada é muito curta !')
            return  
        }
        setEfetuandoLogin(true)
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential)=> {
            const user = userCredential.user
            console.log(user)
             navigation.navigate('Home')
        })
        .catch((error) => {
            Alert.alert('Erro',
          `Erro ao realizar o login: ${error.message}`)
        })
        setEfetuandoLogin(false)
    }

    return (
        <View style={{
            paddingTop: insets.top,
            backgroundColor: themes.colors.brand.verdeEscuro,
            flex: 1
        }}>
            <View style={styles.container}>
                <Image source={require('../../assets/icons8-usuário-de-gênero-neutro-100.png')}
                    style={styles.logo} />
                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Digite seu email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCompleteType="email" />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder='Digite sua senha'
                        style={styles.input}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry />

                    <TouchableOpacity style={styles.loginButton}
                        onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.createusuario}
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.loginButtonText}>
                            Cadastre-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.brand.verdeClaro,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        borderRadius: 16
    },
    titulo: {
        fontSize: 24,
        color: themes.colors.brand.verdeEscuro,
        marginVertical: 8
    },
    logo: {
        width: 200,
        height: 200,
        marginVertical: 16
    },
    input: {
        borderWidth: 1,
        borderColor: themes.colors.brand.verdeEscuro,
        backgroundColor: themes.colors.neutral.foreground,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8
    },
    form: {
        width: '55%'
    },
    createusuario:{
        backgroundColor: themes.colors.utility.info,
        borderRadius: 4,
        padding: 8,
        marginTop: -2
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold', 
    },
    loginButton: {
        backgroundColor: themes.colors.utility.info,
        borderRadius: 4,
        padding: 16,
        marginVertical: 8
    },
    loginButtonText: {
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})