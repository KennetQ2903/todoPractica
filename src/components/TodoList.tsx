import {useCallback,useDeferredValue,useState} from "react"
import type {TTodoItem} from ".."
import {TodoForm} from "./TodoForm"
import {TodoItem} from "./TodoItem"
import {TodoSearchBar} from "./TodoSearchBar"


export const TodoList=() => {
    const [todos,setTodos]=useState<TTodoItem[]>([])
    const [searchTodo,setSearchTodo]=useState('')
    const [formType,setFormType]=useState<'add'|'edit'>('add')
    const [selectedTodo,setSelectedTodo]=useState<TTodoItem|undefined>()
    const query = useDeferredValue(searchTodo)
    
    const addTodo=useCallback((e: React.FormEvent<HTMLFormElement>) => {
        const title=e.currentTarget.title?.value ?? ''
        const description=e.currentTarget.description.value
        const newTodo: TTodoItem={
            id: todos.length+1,
            title,
            description,
            checked: e.currentTarget.completed.checked
        }
        setTodos(prev => prev.concat(newTodo))
    },[todos])
    
    const onSearchTodo=useCallback((value: string) => {
        setSearchTodo(value)
    },[])
    
    const deleteTodo=useCallback((id: number) => {
        setTodos(prev => prev.filter(i => i.id !== id))
    },[])

    const editTodo=useCallback((item: TTodoItem) => {
        setFormType('add')
        const todo=todos.find(i => i.id === item.id)
        if(!todo) return
        const id=item.id
        const title=item.title
        const description=item.description
        const checked = item.checked
        const newTodo: TTodoItem={
            id,
            title,
            description,
            checked
        }
        setTodos(prev => prev.map(i => i.id === id ? newTodo : i))
    },[todos])

    const handleEdit=useCallback((id: number) => {
        setFormType('edit')
        const todo=todos.find(i => i.id===id)
        if(!todo) return
        setSelectedTodo(todo)
    }, [todos])

    return (
        <>
            <div className="header">
                <TodoSearchBar onSearch={onSearchTodo} />
                <TodoForm onSubmit={addTodo}  type={formType} selectedTodo={selectedTodo} onEdit={editTodo} />
            </div>
            <ul>
                {(query ? todos.filter(i =>
                    i.description.toLowerCase().includes(query.toLowerCase())||
                    i.title.toLowerCase().includes(query.toLowerCase())
                ) : todos).map((props) => (
                    <TodoItem key={props.id} {...props} onDelete={deleteTodo} onEdit={handleEdit} />
                ))}
            </ul>
        </>
    )
}