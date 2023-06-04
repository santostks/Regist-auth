import React from 'react'
import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
import themes from '../themes'
import { Entypo, FontAwesome5} from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore'
import { database } from '../../config/firebase'
import { useNavigation } from '@react-navigation/native'

export default function Item({ ...item }) {
    const navigation = useNavigation()
    const onDelete = () => {
        if (Platform.OS !== 'web') {
            Alert.alert('Confirma a exclusão?',
                'Tem certeza que deseja excluir ?',
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
                justifyContent: 'space-between',
            }}>
                <Text style={styles.nome}>Nome</Text>
                
                <Text style={styles.nome}>QTD</Text>
                
                <Text style={styles.nome}>Valor</Text>
                 </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}> 
                <Text style={styles.simple}>{item.nome}</Text>
                <Text style={styles.simple}>{item.quantidade}</Text>
                <Text style={styles.simple}>{item.valor}</Text>
                </View>  
           

            <View style={{
                flexDirection:'row',
                justifyContent:'flex-end',
                marginLeft:12
            }}>
                <Entypo name="edit" size={42}
                    onPress={() =>
                        navigation.navigate('Editar Item', item)}
                    color={themes.colors.utility.success} />
                <FontAwesome5 name="trash-alt" size={42}
                    onPress={onDelete}
                    color={themes.colors.utility.danger} />
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
        padding:3, fontSize: 25, borderRadius:4, fontSize: 24, marginRight: 8, color: themes.colors.brand.verdeClaro
    
    },
        simple: {
        padding:3, fontSize: 25, borderRadius:4, fontSize: 24, marginRight: 8, color: themes.colors.neutral.background
    }
})