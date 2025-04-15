import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
const DUMMY_EXPENSES = [
  {
    id: "e1",
    amount: 19.99,
    date: new Date("2021-01-19"),
    description: "A pair of shoes",
  },
  {
    id: "e2",
    amount: 19.99,
    date: new Date("2021-02-19"),
    description: "A pair of trousers",
  },
  {
    id: "e3",
    amount: 19.99,
    date: new Date("2021-05-20"),
    description: "Some bananas",
  },
  {
    id: "e4",
    amount: 19.99,
    date: new Date("2021-06-20"),
    description: "A book",
  },
  {
    id: "e5",
    amount: 19.99,
    date: new Date("2021-07-20"),
    description: "A book",
  },
  {
    id: "e6",
    amount: 19.99,
    date: new Date("2021-08-20"),
    description: "A book",
  },
  {
    id: "e7",
    amount: 19.99,
    date: new Date("2021-09-20"),
    description: "A book",
  },
  {
    id: "e8",
    amount: 19.99,
    date: new Date("2021-10-20"),
    description: "A book",
  },
  {
    id: "e9",
    amount: 19.99,
    date: new Date("2021-11-20"),
    description: "A book",
  },
];

function ExpensesOutput({ expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={DUMMY_EXPENSES}
        expensesPeriod={expensesPeriod}
      />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}
export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
