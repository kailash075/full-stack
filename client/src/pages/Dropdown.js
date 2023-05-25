import React from "react";
import ReactDOM from "react-dom";
import "./Dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
const options = ['contains', 'startswith', 'equals'];

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
      
    }}
  >
    {children}
    <span className="threedots" />
  </a>
));
export default function App() {
  return (
    <div className="App">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu size="sm" title="">
        
          <Dropdown.Header>Options</Dropdown.Header>
          {options.map((option) => (
            <Dropdown.Item>{option}</Dropdown.Item>
         ))}
          
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
//https://stackoverflow.com/questions/60123638/use-three-dots-span-to-trigger-dropdown/60127027#60127027
