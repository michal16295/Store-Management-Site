import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar } from './components/Navbar';
import { LoginPage } from './Routes/LoginPage';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './Routes/HomePage';
import { ResetPassword } from './Routes/ResetPassword';
import { PrivateRoute } from './Routes/PrivateRoute';
import About from './Routes/About';
import Contacts from './Routes/Contacts';
import { addCustomer } from './Routes/Customers/addCustomer';
import { workersList } from './Routes/Workers/workersList';
import { addWorker } from './Routes/Workers/addWorker';
import { deleteWorker } from './Routes/Workers/deleteWorker';
import Shift from './Routes/Shifts/Shift';
import { Order } from './Routes/Products/order';
import { personalInfo } from './Routes/Workers/personalInfo';
import { RateWorkers } from './Routes/Workers/RateWorkers';
import { addProduct } from './Routes/Products/addProduct';
import { productsList } from './Routes/Products/productsList';
import { rateList } from './Routes/Workers/rateList';
import { searchCustomer } from './Routes/Customers/searchCustomer';
import { woekreEdit, workerEdit } from './Routes/Workers/workerEdit';
import sLocation from './Routes/Customers/sLocation';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return [
      <Navbar />,
      <Router history={history}>
        <div style={{ paddingTop: 59 + 'px', zIndex: 1 }}>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/addCustomer" component={addCustomer} />
          <PrivateRoute path="/addProduct" component={addProduct} />
          <PrivateRoute path="/products" component={productsList} />
          <PrivateRoute path="/order/*" component={Order} />
          <PrivateRoute path="/workers" component={workersList} />
          <PrivateRoute path="/addWorker" component={addWorker} />
          <PrivateRoute path="/deleteWorker" component={deleteWorker} />
          <PrivateRoute path="/Shifts" component={Shift} />
          <PrivateRoute path="/personalInfo" component={personalInfo} />
          <PrivateRoute path="/sLocation" component={sLocation} />
          <PrivateRoute path="/RateWorkers" component={RateWorkers} />
          <PrivateRoute path="/rateList" component={rateList} />
          <PrivateRoute path="/searchCustomer" component={searchCustomer} />
          <PrivateRoute path="/worker/*" component={workerEdit} />
          <Route path="/login" component={LoginPage} />
          <Route path="/reset" component={ResetPassword} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
        </div>
      </Router>
    ];
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
