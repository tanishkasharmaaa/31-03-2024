import { Badge ,Box} from "@chakra-ui/react";
import axios from "axios"
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/navbar'
const initialState={
    task:{}
}
const reducer=(state,{type,payload})=>{
switch(type){
  case "TASK":
    return{
        ...state,
        task:payload
    }  
}

}
export function Task(){
    const{id}=useParams();
    const[data,dispatch]=useReducer(reducer,initialState)
    const getData=async()=>{
try {
    const res=await axios.get(`http://localhost:8080/${id}`);
    const final=res.data;
    dispatch({type:"TASK",payload:final})
    console.log(final)
} catch (error) {
    console.log(error)
}
    }
    useEffect(()=>{getData()},[id])
    return(<div>
        <Navbar/><br/><br/>
        <Badge ><h1>Task :- {Number(id)+1}</h1></Badge>
        <div>
           <Box bg='lightBlue' w='100%' p={4} color='white' >
            <Badge><h1>{data.task.title}</h1></Badge>
            <Box  bg='purple' padding='10px'>
                <Badge style={{fontSize:"20px"}}><span style={{color:"green"}}>Description:-</span></Badge>
                <p style={{fontSize:"20px"}}><span style={{color:"yellow"}}>{data.task.description}</span></p>
                <Badge style={{fontSize:"20px"}}><span style={{color:"green"}}>Details:-</span></Badge>
                <p style={{fontSize:"20px"}}><span style={{color:"yellow"}}>{data.task.details}</span></p>
                <Badge style={{fontSize:"20px"}}><span style={{color:"green"}}>Due Date:-</span></Badge>
                <p style={{fontSize:"20px"}}><span style={{color:"yellow"}}>{data.task.due_date}-4-2024</span></p>
                </Box>
           
           </Box>
        </div></div>
    )
}