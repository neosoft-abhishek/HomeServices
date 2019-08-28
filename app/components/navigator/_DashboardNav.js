import { createStackNavigator } from 'react-navigation';


import Dashboard from '../screens/Dashboard/Home/_Dashboard';
import ServicesCategories from '../screens/Dashboard/Categories/_ServicesCategories';
import SearchLocation from '../screens/Dashboard/Search/_SearchLocation';
import RequestList from '../screens/Request/List/RequestList';
import CreateRequest from '../screens/Request/CreateRequest/CreateRequest';
import Tracking from '../screens/Request/Tracking/Tracking';
import Waiting from '../screens/Request/CreateRequest/Waiting';
import RequestStatus from '../screens/Request/RequestStatus/RequestStatus';
import QuoteDetails from '../screens/Request/QuoteDetails/QuoteDetails';
import TaskDetails from '../screens/Request/TaskDetails/TaskDetails';
import Payment from '../screens/Request/Payment/Payment';
import Review from '../screens/Request/Review/Review';

const DashboardNav = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    ServicesCategories: {
        screen: ServicesCategories,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    SearchLocation: {
        screen: SearchLocation,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    RequestList: {
        screen: RequestList,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    CreateRequest: {
        screen: CreateRequest,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Tracking: {
        screen: Tracking,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Waiting: {
        screen: Waiting,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    RequestStatus: {
        screen: RequestStatus,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    QuoteDetails: {
        screen: QuoteDetails,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    TaskDetails: {
        screen: TaskDetails,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Payment: {
        screen: Payment,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Review: {
        screen: Review,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    }
});

export default DashboardNav;