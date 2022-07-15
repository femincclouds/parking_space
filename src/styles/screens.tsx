import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a8dadc",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#8d99ae",
    padding: 10,
  },
  input: {
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    width: "80%",
  },
  parkingArea: {
    padding: "10%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 20,
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
  modal: {
    top: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  snack: {
    bottom: 5,
    backgroundColor: "red",
    padding: 10,
  },
  snackText: {
    color: "white",
  },
  lots: {
    width: "100%",
  },
  info: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    marginBottom: 10,
  },
  rawText: {
    fontSize: 18,
    fontWeight: "500",
    padding: 10,
  },
});
