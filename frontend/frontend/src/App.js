import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import SignIn from './screens/login';
import Services from './screens/services';
import StartingPanel from './screens/startingPanel';
import TablesPanel from './screens/tablesPanel';
import OrdersPanel from './screens/ordersPanel';
import EmployeesList from './screens/manager_activities/employees/employeesList';
import CategoriesList from './screens/manager_activities/dishes/categoriesList';
import TablesList from './screens/manager_activities/tables/tablesList';
import NewEmployee from './screens/manager_activities/employees/newEmployee';
import EditEmployee from './screens/manager_activities/employees/editEmployee';
import PendingOrders from './screens/pending-orders';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div>
          <main>
            <Routes>
              <Route element={<StartingPanel />} path="/" />
              <Route path="orders/order/:id" element={<OrdersPanel />} />
              <Route path="/start" element={<StartingPanel />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/services" element={<Services />} />
              <Route path="/tablesPanel" element={<TablesPanel />} />
              <Route path="/tablesList" element={<TablesList />} />
              <Route path="/employess/" element={<EmployeesList />} />
              <Route path="/employess/:id" element={<EditEmployee />} />
              <Route path="/employess/new-employee" element={<NewEmployee />} />
              <Route path="/menu" element={<CategoriesList />} />
              <Route path="/pending-orders" element={<PendingOrders />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
