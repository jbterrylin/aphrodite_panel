/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Notify from 'containers/Notify';

import HomePage from 'containers/HomePage';
import TableListingPage from 'containers/TableListingPage';
import GamiguidePage from 'containers/GamiguidePage';
import LogoutForm from 'containers/LogoutForm';
import NotFoundPage from 'containers/NotFoundPage';

import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';

import {
    makeSelectLocation,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
    fetchConfig,
} from './actions';

// import PrivateRoute from './PrivateRoute';

const topbarHeight = '40px';

const HershopContent = styled.div`
    // margin-top: ${topbarHeight};
`;

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(fetchConfig());
    }

    render() {
        return (
            <section>
                <Notify></Notify>

                <HershopContent id="hershop-content-container">
                    <Switch>
                        {/* <Route exact={true} path="/login" component={globalScope.token ? LogoutForm : LoginForm} /> */}
                        <Route exact={true} path="/logout" component={LogoutForm} />
                        <Route exact={true} path="/howto" component={GamiguidePage} />
                        <Route
                        // <PrivateRoute
                            exact={true}
                            path="/"
                            token={globalScope.token || ''}
                            render={() => <HomePage />}
                        />
                        {
                            Object.keys(tableSetting).map((key, index) => (
                                <Route
                                // <PrivateRoute
                                    key={index}
                                    exact={true}
                                    token={globalScope.token || ''}
                                    path={dataChecking(tableSetting, key, 'link')}
                                    render={(props) => <TableListingPage {...props} pageType={key} />}
                                />
                            ))
                        }
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                </HershopContent>
            </section>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'config', reducer });
const withSaga = injectSaga({ key: 'config', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(App);
