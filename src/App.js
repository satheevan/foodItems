import logo from './logo.svg';
import './App.css';
import FoodItems from './components/pages/foodItems.js';
import { ForLoopTable } from './components/practice/forLoopTables.js';
import OrderList from './pages/container/FoodCart/orderList.js';

// class-components
import NameChanges from './components/classComponents/namechanges.js'

function App() {
  return (
   <>
   {/* <FoodItems/> */}
   <OrderList/>
   </>
  );
}

export default App;
