import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';

import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './screens/dashboard';
import DishMenu from './screens/DishMenu';
import Tables from './screens/manager_activities/tables';
import Orders from './screens/orders/index';
import Admin from './screens/admin';
import TablesMap from './screens/tablesMap';
import Staff from './screens/staff';
import SignIn from './screens/login';
import Services from './screens/services';
import StartingPanel from './screens/startingPanel';
import Invite from './screens/invite';
import { red, purple } from '@mui/material/colors';
import TablesPanel from './screens/tablesPanel';
import OrdersPanel from './screens/ordersPanel';
import LaborList from './screens/manager_activities/labor/laborsList';
import CategoriesList from './screens/manager_activities/dishes/categoriesList';
import EditRoom from './screens/manager_activities/tables/editRoom';
import TablesList from './screens/manager_activities/tables/tablesList';
import NewCategory from './screens/manager_activities/dishes/newCategory';
import NewRoom from './screens/manager_activities/tables/addRoom';
import NewLabor from './screens/manager_activities/labor/newLabor';
import EditLabor from './screens/manager_activities/labor/editLabor';
import LoginPin from './screens/loginPIN';
function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div>
          <main>
            <Routes>
              <Route element={<StartingPanel />} path="/" />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dishmenu" element={<DishMenu />} />
              <Route path="/tables_map" element={<TablesMap />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="orders/order/:id" element={<OrdersPanel />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/start" element={<StartingPanel />} />
              <Route path="/admin-panel" element={<Admin />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/services" element={<Services />} />
              <Route path="/tablesPanel" element={<TablesPanel />} />
              <Route path="/tablesList" element={<TablesList />} />
              <Route path="/tablesList/:roomId" element={<EditRoom />} />
              <Route path="/employess/" element={<LaborList />} />
              <Route path="/employess/:laborId" element={<EditLabor />} />
              <Route path="/employess/new-employee" element={<NewLabor />} />
              <Route path="/menu" element={<CategoriesList />} />
              <Route path="/add-category" element={<NewCategory />} />
              <Route path="/add-room" element={<NewRoom />} />
              <Route path="/login-pin" element={<LoginPin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
