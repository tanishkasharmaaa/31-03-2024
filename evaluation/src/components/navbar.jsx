import { NavLink } from "react-router-dom";
 function Navbar(){
return(
    <>
    <NavLink to='/'><h2>Dashboard</h2></NavLink>
    <NavLink to='/create'><h2>Creation</h2></NavLink>
   
    
    </>
)
}
export default Navbar