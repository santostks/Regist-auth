import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, 
         Pressable, Alert } from 'react-native'

import themes from '../themes'

import { database, auth } from '../../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import moment from 'moment'
const hoje = moment()
import {useNavigation} from '@react-navigation/native'

export default function EditarItem({ route }) {
    const navigation = useNavigation()
    const [isOpen, setIsOpen] = useState(false)
    const [editarItem, setEditarItem] = 
          useState(route.params)

    const validarItem = async () => {
        //Efetuando as validações dos formulários
        if(editarItem.nome === ''){
            Alert.alert('Atenção',
            'O campo nome  é obrigatório')
            return
        }
        if(editarItem.categoria === ''){
            Alert.alert('Atenção',
            'O campo categoria é obrigatório')
            return
        }
        if(parseFloat(editarItem.valor) <= 0){
            Alert.alert('Atenção',
            'O valor do item deve ser informado')
            return
        }
        if(parseFloat(editarItem.quantidade) <= 0){
            Alert.alert('Atenção',
            'A quantidade em estoque é inválida')
                    return
        }
        //Lógica para alterar no Firebase
        const docRef = doc(database, 'regist-auth',
        editarItem.id)

        updateDoc(docRef, {
          nome: editarItem.nome,
          categoria: editarItem.categoria,
          quantidade: editarItem.quantidade,
          valor: editarItem.valor,          
          updateAt: hoje.format()  
        })
            navigation.goBack()
    } 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Alterar Item
            </Text>
           
            <TextInput
                style={styles.input}
                placeholder='Nome do Item'
                maxLength={50}
                value={editarItem.nome}
                keyboardType='default'                
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, nome: text })}
            />
            <TextInput
                style={styles.input}
                placeholder='Categoria'
                maxLength={15}
                value={editarItem.categoria}
                keyboardType='default'
                autoCapitalize={'characters'}
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, categoria: text })}
            />
             
               <TextInput
                style={styles.input}
                placeholder='Quantidade Adquirida'                
                keyboardType='numeric'
                maxLength={4} 
                value={editarItem.quantidade}               
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, quantidade: text })}
            />
             <TextInput
                style={styles.input}
                placeholder='Valor de Compra em R$'                
                keyboardType='numeric'  
                value={editarItem.valor}              
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, valor: text })}
            />
            <Pressable onPress={validarItem} style={styles.botao}>
                <Text styles={styles.textoBotao}>Alterar</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#FFF',
        alignItems: 'center'
    },
    title: {
        fontSize: 32, fontWeight: '700'
    },
    emoji: {
        fontSize: 100, borderWidth: 1, borderRadius: 8,
        padding: 8, borderColor: '#DDD'
    },
    input: {
        width: '90%', padding: 8, marginVertical: 4,
        borderWidth: 1, borderColor: '#DDD', borderRadius: 8
    },
    botao: {
        backgroundColor: themes.colors.utility.info,
        borderRadius: 4,
        padding: 16,
        marginTop: 8
    },
    textoBotao: {
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})