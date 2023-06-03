import React, {useState, useEffect, useLayoutEffect} 
       from 'react'
import {View, Text, Alert, ActivityIndicator, ScrollView, 
        StyleSheet, TextInput} from 'react-native'
import BotaoFlutuante from '../components/BotaoFlutuante'
import themes from '../themes'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {auth, database} from '../../config/firebase'
import {signOut} from 'firebase/auth'
import {collection, onSnapshot, orderBy, query, where} 
       from 'firebase/firestore'
import Item from '../components/Item'   

export default function Home({navigation}){
    const [busca, setBusca] = useState('')
    const [items, setItems] = useState([])
    const [carregaItems, setCarregaItems] = useState(false)
   
   useLayoutEffect(()=> {
    navigation.setOptions({
        headerLeft: () => <></>, //remove o voltar
        headerRight: () => <MaterialCommunityIcons.Button
        name="logout"
        backgroundColor={themes.colors.brand.verdeEscuro}
        onPress={handleLogout}>
            Logout
        </MaterialCommunityIcons.Button>
    })
   },[navigation])

   function handleLogout(){
    signOut(auth)
    .then(() => {navigation.navigate('Login')})
   }

   useEffect(() => {
    setCarregaItems(true)
    const collectionRef = collection(database, 'regist-auth')
    const q = query(collectionRef)
    const getItems = onSnapshot(q, querySnapshot => {
        setItems(
            querySnapshot.docs.map(doc => ({
                id: doc.id, 
                nome: doc.data().nome,
                categoria: doc.data().categoria,
                vendido: doc.data().vendido,
                quantidade: doc.data().quantidade,
                valor: doc.data().valor,
                createdAt: doc.data().createdAt
            }))
        )
    })
    setCarregaItems(false)
    return getItems
   }, [])
	
   return (
    <View style={styles.container}>
     <ScrollView contentContainerStyle={{
            paddingBottom: 64
        }}>
        <Text style={styles.tituloApp}>Controle de Items</Text>            
        {carregaItems && 
        <ActivityIndicator size="large"
        color={themes.colors.brand.verdeEscuro}/>}
        
        <TextInput
            placeholder='Buscar 🔎'
            autoFocus
placeholderTextColor={themes.colors.neutral.foreground}
style={styles.buscaInput}
onChangeText={(text)=> setBusca(text)}
/>

        {/*<Text>{JSON.stringify(criptos)}</Text>*/} 
        {
        items
        .filter((item) =>
        item.nome.toLocaleLowerCase()
           .includes(busca.toLocaleLowerCase()))
        .map(dadoitem => 
        <Item key={dadoitem.id} {...dadoitem} />)           
        }
        
        <BotaoFlutuante 
                 onPress={() => navigation.navigate('Novo Item')}
                 icon="cash-plus" />
     </ScrollView>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.brand.verdeEscuro,
        margin: 0
    },
    tituloApp: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: themes.colors.neutral.foreground,
        padding: 8
    },
    buscaInput: {
        color: themes.colors.neutral.foreground,
        backgroundColor: themes.colors.neutral.neutral100,
        borderBottomColor: themes.colors.utility.contrast,
        marginHorizontal: 100,
        marginBottom: 8,
        padding: 8,
        borderBottomWidth: 2,
        textAlign: 'center',

    }
});