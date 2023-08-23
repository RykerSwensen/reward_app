// Imports
import React, {useState, useEffect} from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import Course from './Course';
import { db } from '../firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore";

// Tailwind CSS
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#800080]`,
  container: ` bg-slate-100 max-w-[500px] w-full m-auto rounded-lg shadow-lg p-4`,
  heading: `text-3xl font-bold text-center text-black p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl rounded-lg `,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100 rounded-lg sm:mt-0`,
  count: `text-center p-2s`,
}

function App() {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState('');

  // Create course
  const createCourse = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter the course code');
      return;
    }
    await addDoc(collection(db, 'courses'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read class from firebase
  useEffect(() => {
    const q = query(collection(db, 'courses'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let coursesArr = [];
      querySnapshot.forEach((doc) => {
        coursesArr.push({ ...doc.data(), id: doc.id });
      });
      setCourses(coursesArr);
    });
    return () => unsubscribe();
  }, []);

  // Update class in firebase
  const toggleComplete = async (course) => {
    await updateDoc(doc(db, 'courses', course.id), {
      completed: !course.completed,
    });
  };

  // Delete class
  const deleteCourse = async (id) => {
    await deleteDoc(doc(db, 'courses', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Reward App</h3>
        <form onSubmit={createCourse} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Course'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {courses.map((course, index) => (
            <Course
              key={index}
              course={course}
              toggleComplete={toggleComplete}
              deleteCourse={deleteCourse}
            />
          ))}
        </ul>
        {courses.length < 1 ? null : (
          <p className={style.count}>{`There are ${courses.length} students in this class.`}</p>
        )}
      </div>
    </div>
  );
}

export default App;