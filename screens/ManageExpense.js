import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

// prettier-ignore
function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const expenseId = route.params?.expenseId; // ? is used to check if the value is undefined
  const isEditing = !!expenseId; // trick toconvert value to bool

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    
    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
      expensesCtx.updateExpense(expenseId, expenseData); // this is the local state
      await updateExpense(expenseId, expenseData); // this is the remote state
    } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);


    const errorHandler = () => {
      setError(null);
      navigation.goBack();
    };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      <View style={styles.deleteContainer}>
        {isEditing && (
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        )}
      </View>
    </View>
  );
}
export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
