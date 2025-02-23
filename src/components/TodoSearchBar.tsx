import {FC} from "react"

interface Props {
    onSearch: (value: string) => void
}

export const TodoSearchBar: FC<Props>=({onSearch}) => {
    return (
        <input className="search-bar" type="search" placeholder="Buscar..." onChange={(e) => onSearch(e.target.value)} />
    )
}