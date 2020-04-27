import React ,{useState}from 'react'
import { StyleSheet, Alert, View } from 'react-native'
import {Navbar} from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoID] = useState(null)
  const [todos, setTodos] = useState([
    {id: '1' , title: 'Выучить React Native'}
   
  ])


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
    <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoID}/>
  )

  if(todoId){
    
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = <TodoScreen onRemove={removeTodo} goBack={() => setTodoID(null)} todo={selectedTodo} onSave={updateTodo}/>
  }

  return (
    <View >
      <Navbar title="Todo App !"/>
      <View style={styles.container}>
      {content}
      </View>     
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
