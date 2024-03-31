import {Routes,Route} from 'react-router-dom'
import { Create } from '../components/create'
import { Editing } from '../components/edit'
import { Task } from '../components/task'
import { Listing } from '../components/list'
export function AllRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Listing/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/edit/:id' element={<Editing/>}/>
            <Route path='/task/:id' element={<Task/>}/>
        </Routes>
    )
}