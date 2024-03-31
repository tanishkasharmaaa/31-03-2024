import axios from "axios";
import { Badge, Box, Button } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import Navbar from "../components/navbar";
import { NavLink } from "react-router-dom";
import { Task } from "./task";
const initialState = {
  task: [],
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "TASK":
      return {
        ...state,
        task: payload,
      };
    case "TRUE":
      return {
        ...state,
        task: payload,
      };
    case "FALSE":
      return {
        ...state,
        task: payload,
      };
      case "PRESENT":
        return {
          ...state,
          task: payload,
        };
        case "FUTURE":
            return {
              ...state,
              task: payload,
            };
            case "DELETE_TASK":
                return {
                  ...state,
                  task: state.task.filter(task=>task.id!==payload),
                };
                default:
                    return state;
  }
};

export function Listing() {
  const [data, dispatch] = useReducer(reducer, initialState);
  // FETCHING DATA
  const getData = async () => {
    try {
      const res = await axios.get(`./db.json`);
      const final = res.data;
      console.log(final);
      dispatch({ type: "TASK", payload: final });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  function filter(status) {
    if (status === "true") {
      const Tfilter = [...data.task].filter((ele) => ele.status === true);
      dispatch({ type: "TRUE", payload: Tfilter });
    }
    if (status === "false") {
      const Ffilter = [...data.task].filter((ele) => ele.status === false);
      dispatch({ type: "FALSE", payload: Ffilter });
    }
  }

  function sorting(date) {
if(date==='present'){
    const Psorting=[...data.task].sort((a,b)=>a.due_date-b.due_date)
    dispatch({type:'PRESENT',payload:Psorting})
}
if(date==='future'){
    const Fsorting=[...data.task].sort((a,b)=>b.due_date-a.due_date)
    dispatch({type:'FUTURE',payload:Fsorting})
}
  }

  async function deleteTask(id){
    try {
        await axios.delete(`http://localhost:8080/tasks/${id}`);
        dispatch({type:'DELETE_TASK',payload:id})
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <h1>List of All existing tasks</h1>
      {/* FILTERING */}
      <Button onClick={() => filter("true")}>Complete</Button>
      <Button onClick={() => filter("false")}>Uncomplete</Button><br/>

      {/* SORTING */}
<Button onClick={()=>sorting('present')}>Upcoming Due Dates</Button>
<Button  onClick={()=>sorting('future')}>Future Due Dates</Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          marginTop: "30px",
        }}
      >
        {data.task.map((ele) => (
          <div key={ele.id}>
            {" "}
            <Box bg="lightBlue" w="100%" p={4} color="white">
              <Box bg="purple" padding="10px">
                <Badge>
                  <h1>{ele.title}</h1>
                </Badge>
                <p style={{ fontSize: "20px" }}>
                  <span style={{ color: "yellow" }}>Description:-</span>
                  {ele.description}
                </p>
                <p style={{ fontSize: "20px" }}>
                  <span style={{ color: "yellow" }}>Due Date:-</span>
                  {ele.due_date}-4-2024
                </p>
                <p style={{ fontSize: "20px" }}>
                  <span style={{ color: "yellow" }}>Status:-</span>
                  {JSON.stringify(ele.status)}
                </p>
                <NavLink>
                  <Button>Editing</Button>
                </NavLink>
                <NavLink to={`/task/${ele.id}`}>
                  <Button>Display</Button>
                </NavLink>
                <Button onClick={()=>deleteTask(data.task.id)}>Delete</Button>
              </Box>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
}
