import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const customerFullName = useSelector((store) => store.customer.fullName);
  console.log(customerFullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {customerFullName ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;

