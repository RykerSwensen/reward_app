import React, {useState, useEffect} from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import Student from './Student';
import { db } from './firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore";

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
  const [students, setStudents] = useState([]);
  const [input, setInput] = useState('');

  // Create student
  const createStudent = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a Student Name');
      return;
    }
    await addDoc(collection(db, 'students'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read student from firebase
  useEffect(() => {
    const q = query(collection(db, 'students'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let studentsArr = [];
      querySnapshot.forEach((doc) => {
        studentsArr.push({ ...doc.data(), id: doc.id });
      });
      setStudents(studentsArr);
    });
    return () => unsubscribe();
  }, []);

  // Update student in firebase
  const toggleComplete = async (student) => {
    await updateDoc(doc(db, 'students', student.id), {
      completed: !student.completed,
    });
  };

  // Delete student
  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, 'students', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Reward App</h3>
        <form onSubmit={createStudent} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Student'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {students.map((student, index) => (
            <Student
              key={index}
              student={student}
              toggleComplete={toggleComplete}
              deleteStudent={deleteStudent}
            />
          ))}
        </ul>
        {students.length < 1 ? null : (
          <p className={style.count}>{`There are ${students.length} students in this class.`}</p>
        )}
      </div>
    </div>
  );
}

export default App;