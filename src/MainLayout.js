import React,{useState, useContext} from 'react'
import { View, StyleSheet,Alert } from 'react-native';
import {Navbar} from './components/Navbar'
import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';

export const MainLayout = () => {
    const todoContext = useContext(TodoContext)
    const [todoId, setTodoID] = useState(null)
    const [todos, setTodos] = useState([])

    const updateTodo = (id, title) => {
        setTodos(old => old.map(todo => {
          if(todo.id === id){
            todo.title = title
          }
          return todo
        }))
        setTodoID(null)
      }
    
      const addTodo = (title) => {
        // const newTodo = {
        //   id: Date.now().toString(),
        //   title: title
        // }
    
        // setTodos((prevTodos) => {
        //   return [
        //     ...prevTodos,
        //     newTodo
        //   ]
        // })
        setTodos(prev => [...prev,{
          id: Date.now().toString(),
          title
        }] )
      }
    
      const removeTodo = (todoId) => {
        const todo = todos.find(t => t.id === todoId)
    
        Alert.alert(
          "Удаление элемента",
          `ВЫ уверены что хотите удалить "${todo.title}" ?`,
          [
            {
              text: "Отмена",
              style: "cancel"
            },
            { text: "Удалить",
              style: 'destructive',
              onPress: () => {
              setTodoID(null)
              setTodos(prev => prev.filter(todo => todo.id !== todoId))
            } }
          ],
          { cancelable: false }
        )
        
      }
    
      let content = (
        <MainScreen todos={todoContext.todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoID}/>
      )
    
      if(todoId){
        
        const selectedTodo = todos.find(todo => todo.id === todoId)
        content = <TodoScreen onRemove={removeTodo} goBack={() => setTodoID(null)} todo={selectedTodo} onSave={updateTodo}/>
      }


    return(
        <View >
      <Navbar title="Todo App !"/>
      <View style={styles.container}>
      {content}
      </View>     
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: THEME.PADDING_HORIZONTAL,
      paddingVertical: 20
    }
  });