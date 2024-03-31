import { useState, useReducer } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

export function Create() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        details,
        dueDate,
        status: false,
      };
      await axios.post('http://localhost:8080', newTask);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setTitle('');
      setDetails('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Task Title</FormLabel>
          <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
          <FormLabel>Task Details</FormLabel>
          <Input type='text' value={details} onChange={(e) => setDetails(e.target.value)} required />
          <FormLabel>Task Due Date</FormLabel>
          <Input type='text' value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          <Button type='submit' mt={4} colorScheme='teal'>Add Task</Button>
        </FormControl>
      </form>
    </div>
  );
}
