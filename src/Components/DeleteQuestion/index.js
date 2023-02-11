import { AiTwotoneDelete } from 'react-icons/ai'
import './index.css'

const DeleteQuestion = (props) => {
    const { onDeleteButton, propElement } = props
    const onclickBtn = () => {
        onDeleteButton(propElement)
    }
    return (
        <button onClick={onclickBtn} className="delete-btn"><AiTwotoneDelete /></button>
    )
}

export default DeleteQuestion