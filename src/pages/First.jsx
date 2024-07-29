import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function First() {

    const navigate = useNavigate()
    let student = 'aman'

    const handelRedirect =()=>{
        navigate('/second',{state:{name:student}})
    }

    


  return (
    <div>

        <h1>Helloo </h1>
        <button onClick={handelRedirect}> Click to Open Next page </button>


    </div>
  )
}

export default First