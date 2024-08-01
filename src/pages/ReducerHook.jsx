import React, { useReducer } from 'react'

let initialstate= {count: 0} ;

const reducer =(state,action)=>{

    // if(action == "Increment"){
    //     return state + 1;

    // }else if( action == "Decrement"){
    //     return state - 1

    // }else{
    //     return state;
    // }


    switch (action.type) {
        case "Increment":
            return {count: state.count + 1};
            
            break;
            case "Decrement":
            return {count: state.count - 1};
            
            break;
    
        default:
            return state;
            break;
    }


}

function ReducerHook() {

    const[data, dispatch]=useReducer(reducer, initialstate)



  return (
    <>
    <div >ReducerHook</div>
    <h1> My Data: {data.count} </h1>
    <button onClick={()=>dispatch({type:"Increment"})} >Increment</button>
    <button onClick={()=>dispatch({type:"Decrement"})}>Decrement</button>
    </>
  )
}

export default ReducerHook