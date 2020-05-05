import React , {useState, useContext} from 'react'
import { StyleSheet, View, Button , Dimensions} from 'react-native'
import {FontAwesome, AntDesign} from '@expo/vector-icons'

import {THEME} from '../theme'
import { AppCard } from './../components/UI/AppCard';
import { EditModal } from './../components/EditModal';
import { AppTextBold } from '../components/UI/AppTextBold';
import { AppButton } from './../components/UI/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';



export const TodoScreen = () => {
    const [modal, setmodal] = useState(false)
    const {todos, updateTodo, removeTodo} = useContext(TodoContext)
    const {todoId, changeScreen} = useContext(ScreenContext)

    const todo = todos.find(t => t.id === todoId)

    const saveHandler = async title => {
        await updateTodo(todo.id, title)
        setmodal(false)
    } 

    return (
        <View> 
            <EditModal 
                value={todo.title} 
                visible={modal} 
                onCancel={() => setmodal(false)}
                onSave={saveHandler}
                />          
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setmodal(true)}><FontAwesome name="edit" size={20}/></AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}><AntDesign name="back" size={20} color="#fff"/></AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => removeTodo(todo.id)}
                    ><FontAwesome name="remove" size={20} color="#fff"/></AppButton>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card:{
        marginBottom: 20,
        padding: 15
    },
    button:{
        // width:Dimensions.get('window').width / 3
        width:Dimensions.get('window').width > 400 ? 150 : 120
    },
    title:{
        fontSize: 20
    }


})