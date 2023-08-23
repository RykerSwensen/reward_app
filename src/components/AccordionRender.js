// Imports
import React, {useState, useEffect} from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import { db } from '../firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore";
import { AccordionContainer, AccordionContent } from './Accordion';
import css from '../App.css';

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

// Accordion
const Accordion = ({items, multiple}) => {
  const [active, setActive] = useState();
  const [activeArr, setActiveArr] = useState([]);
  let p = [...items].map(item => {
    return { name: item.name, active: false }
  });
  useEffect(() => {
    setActiveArr(p);
  }, []);
  const handleClick = (name) => {
    setActive(name === active ? null : name);
    if (multiple) {
      let ind = activeArr.findIndex((i)=> i.name === name);
      let upd = [...activeArr];
      upd[ind].active = !upd[ind].active;
      setActiveArr(upd);
    }
  };
  return <AccordionContainer>
    {items.map(item =>{
      let isActive = active === item.name;
      if (multiple) isActive = activeArr.some((i)=> i.name === item.name && i.active);
      return <AccordionContent onClick={() => handleClick(item.name)}
      itemName={item.name} itemContent={item.content} isActive={isActive} />
    })}
  </AccordionContainer>
}

const DropDown = () => {
  let items = [
    {
      name: "Header 1",
      content: <div>Content of header 1</div>
    },
    {
      name: "Header 2",
      content: <div>TThe content within header 2</div>
    },
    {
      name: "Header 3",
      content: <div>This is a test of content within header 3</div>
    },
    {
      name: "Header 4",
      content: <div>Again, another test</div>
    },
  ]
  return (
    <div style={{width: "100%", height: "100vh", display: "grid", placeItems:"center",
    backgroundColor:"#0a0a0a"}}>
      <Accordion multiple items={items} />
    </div>
  )
}
export default DropDown;