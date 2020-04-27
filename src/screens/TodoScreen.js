import React , {useState} from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import {THEME} from '../theme'
import { AppCard } from './../components/UI/AppCard';
import { EditModal } from './../components/EditModal';

export const TodoScreen = ({ goBack, todo,onRemove, onSave }) => {
    const [modal, setmodal] = useState(false)

    const saveHandler = title => {
        onSave(todo.id, title)
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
                <Text style={styles.title}>{todo.title}</Text>
                <Button title="Ред." onPress={() => setmodal(true)}/>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR}/>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Удалить"
                        color={THEME.DANGER_COLOR}
                        onPress={() => onRemove(todo.id)}
                    />
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
        width:'40%'
    },
    title:{
        fontSize: 20
    }


})