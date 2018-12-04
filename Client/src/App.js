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
    return (
        [<Navbar />,
             <Router history={history}>
             <div style={{paddingTop: 59 + 'px', zIndex: 1}}>
                 <PrivateRoute exact path="/" component={HomePage} />
                 <PrivateRoute path="/addCustomer" component={addCustomer}/>
                 <PrivateRoute path="/workers" component={workersList}/>
                 <PrivateRoute path="/addWorker" component={addWorker}/>
                 <PrivateRoute path="/deleteWorker" component={deleteWorker}/>
                 <Route path="/login" component={LoginPage} />
                 <Route path="/reset" component={ResetPassword} />
                 <Route path="/about" component={About}/>
                 <Route path="/contacts" component={Contacts}/>
            </div>
            </Router>
            
        ]
    );
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
