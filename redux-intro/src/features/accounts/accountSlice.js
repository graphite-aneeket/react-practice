import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance += Number(action.payload);
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      console.log("Aneeket action: ", action);
      if (state.loan > 0) return;
      state.loan = Number(action.payload.amount);
      state.loanPurpose = action.payload.purpose;
      state.balance += Number(action.payload.amount);
    },
    payLoan(state) {
      state.purpose = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
  },
});

export const deposit = function (amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
};

console.log("Aneeket: ", accountSlice);

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;
export default accountSlice.reducer;

/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export const deposit = function (amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
};

export const withdraw = function (amount) {
  return { type: "account/withdraw", payload: amount };
};

export const requestLoan = function (amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
};

export const payLoan = function () {
  return { type: "account/payLoan" };
};
*/
