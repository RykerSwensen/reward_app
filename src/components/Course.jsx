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

const Course = ({ course, toggleComplete, deleteCourse }) => {
  return (
    <li className={course.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input onChange={() => toggleComplete(course)} type='checkbox' checked={course.completed ? 'checked' : ''} />
        <p onClick={() => toggleComplete(course)} className={course.completed ? style.textComplete : style.text}>
          {course.text}
        </p>
      </div>
      <button onClick={() => deleteCourse(course.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Course;