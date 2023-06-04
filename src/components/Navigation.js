import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'
import AddItem from '../screens/AddItem'
import EditarItem from '../screens/EditarItem'

const Stack = createNativeStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator>
            
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login} />
            <Stack.Screen 
                name="Home" 
                options={{title: ''}} 
                component={Home}/>
            <Stack.Screen 
                name="Novo Item" 
                component={AddItem} 
                options ={{ presentation: 'modal'}} /> 
            <Stack.Screen 
                name="Editar Item" 
                component={EditarItem} 
                options ={{ presentation: 'modal'}} />         
            <Stack.Screen
                name="Signup"
                options={{ headerShown: false }}
                component={Signup} />
            
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}