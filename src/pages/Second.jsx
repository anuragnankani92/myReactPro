// import React,{useEffect, useState} from 'react'
// import { useLocation } from 'react-router-dom'
// import axios from 'axios'

// function Second() {
//     const [studentData, setStudentData] = useState([])
//     const [popUp, setPopUp]=useState(false)
//     const showPopUp =()=> setPopUp(!popUp);
//     const [editId, setEditId]=useState(null)
//     let data ={
//         firstname:'',
//         email:'',
//         password:''
//     }
//     const [myData, setMyData]=useState(data)
//     let location = useLocation();
//     console.log(location)

//     useEffect(()=>{
//         axios.get('https://633e7f1783f50e9ba3b1cef1.mockapi.io/students')
//         .then((res)=>{
//             setStudentData(res.data)
//             console.log(res)
//         })
//     },[])

    
//     const handelSubmit=(e)=>{
//         e.preventDefault()
//         if(editId){
//             axios.put(`https://633e7f1783f50e9ba3b1cef1.mockapi.io/students/${editId}`,myData)
//             .then((res)=>{
//                 console.log(res.data)
//                 let record = studentData.map((item)=>{
//                     return item.id === editId ? res.data : item

//                 })
//                 console.log(record,'recorddddd')
//                 setStudentData(record)
//                 setPopUp(false)
//                 setMyData(data)
//                 setEditId(null)

//             })
//         }else{
//             axios.post('https://633e7f1783f50e9ba3b1cef1.mockapi.io/students',myData)
//             .then((res)=>{
//                 console.log(res.data)
//                 setStudentData([...studentData, res.data])
//                 setPopUp(false)
//                 setMyData('')
//             })
//         }
      
//     }

//     const handelChange=(e)=>{
//       setMyData({...myData,[e.target.name]:e.target.value})
//     }

//     const handelDelete=(id)=>{
//         console.log(id,'delete')
//         axios.delete(`https://633e7f1783f50e9ba3b1cef1.mockapi.io/students/${id}`)
//         .then((res)=>{
//             console.log(res)
//           let record=  studentData.filter((value)=>{
//                 return value.id !==id
//             })
//             console.log(data,'dataaaaa')
//             console.log(record,'recordddsss')
//             setStudentData(record)
//         })
//     }

//     const handelEdit =(id)=>{
//         // console.log('myID',id)
//         let data = studentData.find((value)=>{
//             return value.id === id
//         })
//         // let data ={
//         //     firstname:'firstname 1',
//         //     email:'email 1',
//         // password:'password 1'
//         // }
//         let record ={
//             firstname:data.firstname,
//             email:data.email,
//             password:data.password
//         }
//         setMyData(record)
//         setPopUp(true)
//         setEditId(id)

//     }
//     // console.log('dataaaa', myData)
//     console.log(editId,'myeditidddd')


//   return (
//     <>
//     <h1> Hello {location.state.name}, Welcome to  Second Page</h1>
//     <button onClick={showPopUp}> Add Data </button>
// {
//     popUp &&(
//         <form onSubmit={handelSubmit}>
//         <h1>Student Registration</h1>
//         <label>Name:</label>

//         <input 
//         type='text' 
//         placeholder='Entet your Name' 
//         name='firstname' 
//         value={myData.firstname} 
//         onChange={handelChange}
//           /> <br />

//         <label>Email:</label>

//         <input 
//         type='email' 
//         placeholder='Entet your Email' 
//         name='email' 
//         value={myData.email} 
//         onChange={handelChange}
//         // onChange={(e)=>setMyData({...myData,email:e.target.value})} 
//         /><br />

//         <label>Password:</label>

//         <input 
//         type='password' 
//         placeholder='Entet your Password' 
//         name='password' 
//         value={myData.password}   
//         onChange={handelChange}
//         /> <br />

//         <input 
//         type='submit'  
//         // value='Add Student'
//         value={editId ? 'Update Student': 'Add Student'}

//          />
//         <button>Cancel</button>

//     </form>
//     )
// }
   

//     <table style={{marginLeft: "41%",
//     marginTop: "3%"}}>
//         <thead>
//             <tr>
//                 <th> SNO </th>
//                 <th> First Name </th>
//                 <th> Email </th>
//                 <th> Password </th>
//                 <th> Action </th>
//             </tr>
//         </thead>
//         <tbody>
//             {
//                 studentData.map((value, index)=>{
//                     return(
//                         <tr>
//                             <td> {index + 1} </td>
//                             <td> {value.firstname} </td>
//                             <td> {value.email} </td>
//                             <td> {value.password} </td>
//                             <td>
//                                 <button onClick={()=>handelEdit(value.id)} >Edit</button>
//                                 <button onClick={()=>handelDelete(value.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     )

//                 })
//             }

//         </tbody>
//     </table>
        
//     </>
//   )
// }

// export default Second

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../styles/Pagination.css'

function Second() {
    const [studentData, setStudentData] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [editId, setEditId] = useState(null);
    const [myData, setMyData] = useState({ firstname: '', email: '', password: '' });

    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 3; // Number of items per page

    const location = useLocation();

    useEffect(() => {
        axios.get('https://633e7f1783f50e9ba3b1cef1.mockapi.io/students')
            .then((res) => {
                setStudentData(res.data);
            });
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            axios.put(`https://633e7f1783f50e9ba3b1cef1.mockapi.io/students/${editId}`, myData)
                .then((res) => {
                    const updatedRecords = studentData.map(item => item.id === editId ? res.data : item);
                    setStudentData(updatedRecords);
                    setPopUp(false);
                    setMyData({ firstname: '', email: '', password: '' });
                    setEditId(null);
                });
        } else {
            axios.post('https://633e7f1783f50e9ba3b1cef1.mockapi.io/students', myData)
                .then((res) => {
                    setStudentData([...studentData, res.data]);
                    setPopUp(false);
                    setMyData({ firstname: '', email: '', password: '' });
                });
        }
    };

    const handleChange = (e) => {
        setMyData({ ...myData, [e.target.name]: e.target.value });
    };

    const handleDelete = (id) => {
        axios.delete(`https://633e7f1783f50e9ba3b1cef1.mockapi.io/students/${id}`)
            .then(() => {
                const updatedRecords = studentData.filter(value => value.id !== id);
                setStudentData(updatedRecords);
            });
    };

    const handleEdit = (id) => {
        const data = studentData.find(value => value.id === id);
        setMyData({ firstname: data.firstname, email: data.email, password: data.password });
        setPopUp(true);
        setEditId(id);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = studentData.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(studentData.length / itemsPerPage);

    return (
        <>
            <h1>Hello {location.state?.name || 'Guest'}, Welcome to the Second Page</h1>
            <button onClick={() => setPopUp(!popUp)}>Add Data</button>
            {popUp && (
                <form onSubmit={handleSubmit}>
                    <h1>Student Registration</h1>
                    <label>Name:</label>
                    <input
                        type='text'
                        placeholder='Enter your Name'
                        name='firstname'
                        value={myData.firstname}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Email:</label>
                    <input
                        type='email'
                        placeholder='Enter your Email'
                        name='email'
                        value={myData.email}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        type='password'
                        placeholder='Enter your Password'
                        name='password'
                        value={myData.password}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        type='submit'
                        value={editId ? 'Update Student' : 'Add Student'}
                    />
                    <button type='button' onClick={() => setPopUp(false)}>Cancel</button>
                </form>
            )}
            <table style={{ marginLeft: "41%", marginTop: "3%" }}>
                <thead>
                    <tr>
                        <th>SNO</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((value, index) => (
                        <tr key={value.id}>
                            <td>{offset + index + 1}</td>
                            <td>{value.firstname}</td>
                            <td>{value.email}</td>
                            <td>{value.password}</td>
                            <td>
                                <button onClick={() => handleEdit(value.id)}>Edit</button>
                                <button onClick={() => handleDelete(value.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </>
    );
}

export default Second;
