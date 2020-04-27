import React, {useState} from 'react'
import { StyleSheet, View, TextInput, Button, Modal, Alert} from 'react-native';
import { THEME } from './../theme';


export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if(title.trim().length < 4){
            Alert.alert('Ошибка!', `Минимальная длина названия 4 символа. Cейчас ${title.trim().length} ${title.trim().length === 1 ? 'символ' :
            title.trim().length === 0 ? 'символов': 'символa'}.` )
        }else{
            onSave(title)
        }
    }

    return(
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.wrap}>
                <TextInput style={styles.input} 
                    placeholder="Введите название" 
                    autoCapitalize="none" 
                    autoFocus="false"
                    maxLength={64}
                    value={title}
                    onChangeText={setTitle}
                    />
                <View style={styles.buttons}>
                <Button title="Отменить" onPress={onCancel} color={THEME.DANGER_COLOR}/>
                <Button title="Сохранить" onPress={saveHandler}/>
                </View>
        </View>
        </Modal>
        
    )
}

const styles = StyleSheet.create({
    wrap:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons:{
        width:'100%',
        marginTop: 10,
        flexDirection:'row',
        justifyContent:'space-around'

    }
})