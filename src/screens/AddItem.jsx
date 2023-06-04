import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, 
         Pressable, Alert} from 'react-native'
import themes from '../themes'
import { database, auth } from '../../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import moment from 'moment'
const hoje = moment()

export default function AddItem({ navigation }) {
    const [isOpen, setIsOpen] = useState(false)
    const [submitted, setSubmitted] = useState('')
    const [novoItem, setNovoItem] = useState({
        nome: '',
        categoria: '',
        quantidade: 0,
        valor: 0,
        createdAt: hoje.format(),
        usuarioInclusao: auth.currentUser.uid
    })

    const validarItem = async () => {
        setSubmitted (!submitted);
        //Efetuando as validações dos formulários
        if(novoItem.nome === ''){
            Alert.alert('Atenção',
            'O campo nome  é obrigatório')
            return
        }
        /*if(novoItem.categoria.length === ''){
            Alert.alert('Atenção',
            'O campo categoria é obrigatório')
            return
        }*/
        if(parseFloat(novoItem.valor) === ''){
            Alert.alert('Atenção',
            'O valor do item deve ser informado')
            return
        }
        if(parseFloat(novoItem.quantidade) === ''){
            Alert.alert('Atenção',
            'A quantidade em estoque é inválida')
            return
        }
        //Lógica para salvar no Firebase
        const docRef = await addDoc(
            collection(database, 'regist-auth'), novoItem)
            navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Cadastro
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder='Nome do produto'
                maxLength={50}
                keyboardType='default'                
                onChangeText={(text) => setNovoItem(
                    { ...novoItem, nome: text })}
            />
        
             <TextInput
                style={styles.input}
                placeholder='Categoria'
                maxLength={15}
                value= {novoItem.categoria}
                keyboardType='default'
                autoCapitalize={'characters'}
                onChangeText={(text) => setNovoItem(
                    { ...novoItem, categoria: text })}
            />
               <TextInput
                style={styles.input}
                placeholder='Quantidade Estoque'  
                maxLength={4}              
                keyboardType='numeric'                
                onChangeText={(text) => setNovoItem(
                    { ...novoItem, quantidade: text })}
            />
             <TextInput
                style={styles.input}
                placeholder='Valor unitário'                
                keyboardType='numeric'                
                onChangeText={(text) => setNovoItem(
                    { ...novoItem, valor: text })}
            />
            <Pressable onPress={validarItem} style={styles.botao}>
                <Text styles={styles.textoBotao}>Salvar</Text>
                 
                 {submitted ?
                <Text style={styles.title}>
                Registrado com sucesso!</Text>
                :
                null
                }
            </Pressable>
           

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#FFF',
        alignItems: 'center',
        paddingTop: 40
    },
    title: {
        fontSize: 32, fontWeight: '700'
    },
    input: {
        width: '90%', padding: 8, marginVertical: 4,
        borderWidth: 1, borderColor: '#DDD', borderRadius: 8
    },
    botao: {
        backgroundColor: themes.colors.utility.info,
        borderRadius: 4,
        padding: 16,
        marginVertical: 8,

    },
    textoBotao: {
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})