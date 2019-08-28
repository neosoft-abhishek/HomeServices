import { createStackNavigator } from 'react-navigation';

import RequestList from '../screens/Request/List/RequestList';
import RequestStatus from '../screens/Request/RequestStatus/RequestStatus';
import QuoteDetails from '../screens/Request/QuoteDetails/QuoteDetails';
import TaskDetails from '../screens/Request/TaskDetails/TaskDetails';
import Payment from '../screens/Request/Payment/Payment';
import Review from '../screens/Request/Review/Review';
import PaymentResult from '../screens/Request/PaymentResult/PaymentResult';

const MyRequestNav = createStackNavigator({
    RequestList: {
        screen: RequestList,
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
    PaymentResult: {
        screen: PaymentResult,
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

export default MyRequestNav;