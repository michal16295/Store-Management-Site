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
             <div>
                 <PrivateRoute exact path="/" component={HomePage} />
                 <Route path="/login" component={LoginPage} />
                 <Route path="/reset" component={ResetPassword} />
                 <Route path="/about" component={About}/>
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
