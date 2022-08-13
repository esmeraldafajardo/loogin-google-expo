import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./src/screens/MainNavigator";
import RestApiProvider from "./src/providers/RestApiProvider";
import store from "./src/store";
import { StyleSheet, View } from "react-native";

import { Title } from "react-native-paper";

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        {/* <RestApiProvider> */}
        <SafeAreaProvider style={{ backgroundColor: "red" }}>
          <MainNavigator />
        </SafeAreaProvider>
        {/* </RestApiProvider> */}
      </PaperProvider>
    </Provider>
  );
};

export default App;
