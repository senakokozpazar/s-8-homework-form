import { Route, Switch } from 'react-router-dom';
import FormPage from './FormPage';
import Success from './Success'; 

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={FormPage} />
      <Route path="/success" component={Success} />
    </Switch>
  );
}

    

 
     


