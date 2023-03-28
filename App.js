import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
// import {StoreProvider} from './src/Context/store/index';
const App = () => {
  return (
    <View style={styles.mainContainer}>
      {/* <StoreProvider> */}
        <AppNavigator />
      {/* </StoreProvider> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default App;
