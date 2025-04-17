import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  if (isLoading) {
    return <LoadingOverlay />;
  } else if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  } else {
    return (
      <ExpensesOutput
        expensesPeriod="Last 7 Days"
        expenses={recentExpenses}
        fallbackText="No expenses for the last 7 days."
      />
    );
  }
}
export default RecentExpenses;
