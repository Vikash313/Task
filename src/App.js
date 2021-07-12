import './App.css';
import TableData from './components/tableData';
import Todo from './components/Todo';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Switch>
         <Route exact path="/" component={Todo} />
         <Route exact path="/tableData" component={TableData} />
       </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;
