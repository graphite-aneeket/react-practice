import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loanPurpose: "",
        loan: 0,
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const deposit = function (amount) {
  return { type: "account/deposit", payload: amount };
};

const withdraw = function (amount) {
  return { type: "account/withdraw", payload: amount };
};

const requestLoan = function (amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
};

const payLoan = function () {
  return { type: "account/payLoan" };
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, "To buy a car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

console.log("Hey Redux");

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer("Aneeket Kumar", "24343434"));
store.dispatch(deposit(250));
console.log(store.getState());
