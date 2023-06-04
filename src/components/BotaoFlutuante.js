import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import themes from '../themes'
import { AntDesign } from '@expo/vector-icons';

const BotaoFlutuante = ({ onPress, pluscircleo }) => (
    <TouchableOpacity style={styles.button}
        onPress={onPress} icon={pluscircleo}>
        <AntDesign name="pluscircle" size={50} color="white" />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        position: 'absolute',   top: 8,
        right: 16,
        backgroundColor: themes.colors.brand.verdeClaro,
        borderRadius: 32,     width: 64,
        height: 64,
        justifyContent: 'center',    alignItems: 'center'
    }
})

export default BotaoFlutuante