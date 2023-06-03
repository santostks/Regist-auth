import React from 'react'
import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
import themes from '../themes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteDoc, doc } from 'firebase/firestore'
import { database } from '../../config/firebase'
import { useNavigation } from '@react-navigation/native'

export default function Item({ ...item }) {
    const navigation = useNavigation()
    const onDelete = () => {
        if (Platform.OS !== 'web') {
            Alert.alert('Confirma a exclusão?',
                'Confirma a exclusão deste registro?\nA operação não poderá ser desfeita',
                [
                    { text: 'Não', style: 'cancel' },
                    {
                        text: 'Sim', onPress: () => {
                            const docRef = doc(database, 'regist-auth', item.id)
                            deleteDoc(docRef)
                        }
                    }
                ]
            )
        } else {
            let confirma = confirm('Confirma a exclusão?')
            if (confirma) {
                const docRef = doc(database, 'regist-auth', item.id)
                deleteDoc(docRef)
            }
        }

    }

    return (
        <View style={styles.itemContainer}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={styles.simple}>Nome</Text>
                <Text style={styles.simple}>QTD</Text>
                <Text style={styles.simple}>Valor</Text>
                
                <MaterialCommunityIcons name="circle-edit-outline" size={32}
                    onPress={() =>
                        navigation.navigate('Editar Item', item)}
                    color={themes.colors.utility.success} />
                <MaterialCommunityIcons name="trash-can" size={32}
                    onPress={onDelete}
                    color={themes.colors.utility.danger} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.nome}>{item.quantidade}</Text>
                <Text style={styles.nome}>{item.valor}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        backgroundColor: themes.colors.neutral.foreground,
        margin: 25,
        borderRadius: 8
    },
    nome: {
         padding:10, borderRadius:4, fontSize: 24, marginRight: 8, fontWeight: 'bold'
    },
    simple: {
        fontSize: 18, marginRight: 8, fontWeight:'normal'
    }
})