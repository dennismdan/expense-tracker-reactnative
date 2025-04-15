import ExpenseItem from "./ExpenseItem";
import { FlatList, StyleSheet } from "react-native";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      style={styles.expensesList}
    />
  );
}
export default ExpensesList;

const styles = StyleSheet.create({
  expensesList: {
    paddingHorizontal: 14,
  },
});
