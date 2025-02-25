import {FC} from "react"
import {TTodoItem} from ".."
import {EditIcon, TrashIcon} from "../icons/Icon"

interface Props {
    onDelete: (id: number) => void
    onEdit: (id: number) => void
}

export const TodoItem: FC<TTodoItem&Props>=({description,id,title, checked = false, dueDate,onDelete, onEdit}) => {
    
    const handleDelete=() => {
        console.log(id)
        onDelete(id)
    }

    const handleEdit=() => {
        onEdit(id)
    }

    return (
        <li id={`${id}`}>
            <section className="todo-item">
                <label>Titulo: {title}</label>
                <p>Descripcion: {description}</p>
                <span>completado:{checked? '✔️':'❌'}</span>
                <span>Fecha de vencimiento: {dueDate? dueDate:'Sin fecha'}</span>
            </section>
            <section className="todo-item-actions">
                <button onClick={handleDelete}>
                    <TrashIcon />
                </button>
                <button onClick={handleEdit}>
                    <EditIcon />
                </button>
            </section>
        </li>
    )
}