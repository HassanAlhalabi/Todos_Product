import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {BrowserRouter , Route ,Switch, Link } from 'react-router-dom'
import Todo from './component/todo/Todo';
import Product from './component/product/Product';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <div className="App">
            <Link to='/todo'>ToDo App ):</Link>
            <Link to='/product'>Product ):</Link>
            <Switch>
              <Route path='/todo' exact component={Todo} />
              <Route path='/product' exact component={Product} />
            </Switch>      
          </div>
      </BrowserRouter>  
    </Provider>   
  );
}

export default App
