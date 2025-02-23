import type {TTodoItem} from ".."

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    type?: 'edit'|'add'
    selectedTodo?: TTodoItem
    onEdit?: (item?: TTodoItem) => void
}

export const TodoForm: React.FC<Props>=({onSubmit, type='add', selectedTodo, onEdit}) => {

    const showForm=() => {
        const dialog=document.getElementById('addTodoForm') as HTMLDialogElement
        dialog.showModal()
    }

    const cancel=() => {
        const dialog=document.getElementById('addTodoForm') as HTMLDialogElement
        dialog.close()
    }

    const confirm=(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dialog=document.getElementById('addTodoForm') as HTMLDialogElement
        dialog.close()
        if(type==='edit') {
            onEdit?.({
                id: selectedTodo?.id as number,
                title: e.currentTarget.title.value || '',
                description: e.currentTarget.description.value,
                checked: e.currentTarget.completed.checked
            })
        } else {
            onSubmit(e)
        }
        //clear values
        return e.currentTarget.reset()
          
    }
    
    return (
        <>
            <button onClick={showForm}>Agregar</button>
            <dialog id="addTodoForm" open={type === 'edit'} className="form-dialog">
                <form method="dialog" onSubmit={confirm} encType="multipart/form-data" className="form-todo">
                    <section className="form-section">
                        <label>Titulo</label>
                        <input type="text" id="title" name="title" required defaultValue={selectedTodo?.title} />
                    </section>
                    <section className="form-section">
                        <label >Descripcion</label>
                        <textarea id="description" name="description" required defaultValue={selectedTodo?.description}></textarea>
                    </section>
                    <section className="form-section-checkbox">
                        <label>Tarea completada?</label>
                        <input type="checkbox" name="completed" defaultChecked={selectedTodo?.checked} />
                    </section>
                    <section className="form-section">
                        <label>Fecha de vencimiento </label>
                        <input type="date" name="dueDate" defaultValue={selectedTodo?.dueDate} />
                    </section>
                    <menu className="form-menu">
                        <button id="cancel" type="reset" onClick={cancel}>Cancel</button>
                        <button type="submit">Confirm</button>
                    </menu>
                </form>
            </dialog>
            </>
    )
}