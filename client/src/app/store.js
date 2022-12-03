import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import billsReducer from "../features/Bills/billsSlice";
import workersReducer from "../features/Workers/workersSlice";
import logsReducer from "../features/Logs/logsSlice";
import payeesReducer from "../features/Payees/payeesSlice";
import chequesReducer from "../features/Cheques/chequesSlice";
import userSlice from '../features/Users/userSlice';

const store = configureStore({
    reducer: {
        bills: billsReducer,
        workers: workersReducer,
        logs: logsReducer,
        payees: payeesReducer,
        cheques: chequesReducer,
        user: userSlice,
    }
}, applyMiddleware(thunk))

export default store;