import React, {useState, useEffect} from 'react'
 import { useNavigate , useParams } from 'react-router-dom'
import './AddEdit.css'
 import fireDb, { db } from '../firebase'
 import { toast } from 'react-toastify'
// import MyTextField from '../components/MyTextField'
import { ref, uploadBytes, getDownloadURL, listAll, list,} from "firebase/storage";
import {storage} from '../firebase'
import {v4} from 'uuid'

const initialState = {
    photo: '',
    fName: '',
    lName: '',
    course: '',
    email: '',
    points: '',
}

const AddEdit = () => {
const [image, setImage] = useState(null);
const [url, setUrl] = useState("");
const [state, setState] = useState(initialState);
const [data, setData] = useState({});
const {fName, lName, photo, course, email, points} = state;
const history = useNavigate();
const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
};
const handleSubmit = (e) => {
    const imageRef = ref(storage, "image");
    e.preventDefault();
    if(!photo || !fName || !lName || !course || !email || !points) {
        toast.error('Please provide value in all fields');
    } else {
        fireDb.child('students').push(state, (err) => {
            if(err) {
                toast.error(err)
            } else {
                toast.success('Student added successfully')
            }
        });
        setTimeout(() => history.push('/'), 500);
    };
    uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then((url) => {
            setUrl(url);
    })
    .catch((error) => {
        console.log(error.message, "Error getting image URL");
    });
    // setImage(null);
    })
    .catch((error) => {
        console.log(error.message);
    });
};
const handleImageChange = (e) => {
    if (e.target.files[0]) {
        setImage(e.target.files[0]);
    }
};

  return (
    <div style={{marginTop: "100px"}}>
        <form stle={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center",}} onSubmit={handleSubmit}>

            {/* Photos */}
            <label htmlFor="photo">Photo</label>
            <input type="file" id="photo" name="photo"  alt="Base64 Image" placeholder="Base64 Photo" value={photo} onChange={handleInputChange} />

            {/* First Name */}
            <label htmlFor="fName">First Name</label>
            <input type="text" id="fName" name="fName" placeholder="First Name" value={fName} onChange={handleInputChange} />

            {/* Last Name */}
            <label htmlFor="lName">Last Name</label>
            <input type="text" id="lName" name="lName" placeholder="Last Name" value={lName} onChange={handleInputChange} />

            {/* Course */}
            <label htmlFor="course">Couse Code</label>
            <input type="text" id="course" name="course" placeholder="Course Code" value={course} onChange={handleInputChange} />

            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Student Email" value={email} onChange={handleInputChange} />

            {/* Points */}
            <label htmlFor="points">Points</label>
            <input type="number" id="points" name="points" placeholder="Total Points" value={points} onChange={handleInputChange} />

            {/* Submit */}
            <input type="submit" value="Save" />
        </form>
    </div>
  )
}

export default AddEdit