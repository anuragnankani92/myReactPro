import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Second() {
    const [studentData, setStudentData] = useState([])

    const [popUp, setPopUp]=useState(false)

    const showPopUp =()=> setPopUp(!popUp);

    let data ={
        firstname:'',
        email:'',
        password:''
    }
    const [myData, setMyData]=useState(data)


    let location = useLocation();
    console.log(location)

    useEffect(()=>{
        axios.get('https://633e7f1783f50e9ba3b1cef1.mockapi.io/students')
        .then((res)=>{
            setStudentData(res.data)
        })
    },[])

    
    const handelSubmit=(e)=>{
        e.preventDefault()
        axios.post('https://633e7f1783f50e9ba3b1cef1.mockapi.io/students',myData)
        .then((res)=>{
            console.log(res.data)
            setStudentData([...studentData, res.data])
            setPopUp(false)
            setMyData('')
        })
    }

    const handelChange=(e)=>{
      setMyData({...myData,[e.target.name]:e.target.value})
    }


  return (
    <>
    <h1> Hello {location.state.name}, Welcome to  Second Page</h1>
    <button onClick={showPopUp}> Add Data </button>
{
    popUp &&(
        <form onSubmit={handelSubmit}>
        <h1>Student Registration</h1>
        <label>Name:</label>

        <input 
        type='text' 
        placeholder='Entet your Name' 
        name='firstname' 
        value={myData.firstname} 
        onChange={handelChange}
          /> <br />

        <label>Email:</label>

        <input 
        type='email' 
        placeholder='Entet your Email' 
        name='email' 
        value={myData.email} 
        onChange={handelChange}
        // onChange={(e)=>setMyData({...myData,email:e.target.value})} 
        
        /><br />

        <label>Password:</label>

        <input 
        type='password' 
        placeholder='Entet your Password' 
        name='password' 
        value={myData.password}   
        onChange={handelChange}
        /> <br />

        <input type='submit'  value='Add Student' />

    </form>
    )
}
   

    <table style={{marginLeft: "41%",
    marginTop: "3%"}}>
        <thead>
            <tr>
                <th> SNO </th>
                <th> First Name </th>
                <th> Email </th>
                <th> Password </th>
            </tr>
        </thead>
        <tbody>
            {
                studentData.map((value, index)=>{
                    return(
                        <tr>
                            <td> {index + 1} </td>
                            <td> {value.firstname} </td>
                            <td> {value.email} </td>
                            <td> {value.password} </td>
                        </tr>
                    )

                })
            }

        </tbody>
    </table>
        
    </>
  )
}

export default Second