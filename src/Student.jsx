import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
}

const Student = ({ student, toggleComplete, deleteStudent }) => {
  return (
    <li className={student.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input onChange={() => toggleComplete(student)} type='checkbox' checked={student.completed ? 'checked' : ''} />
        <p onClick={() => toggleComplete(student)} className={student.completed ? style.textComplete : style.text}>
          {student.text}
        </p>
      </div>
      <button onClick={() => deleteStudent(student.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Student;