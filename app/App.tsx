import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { CommentContextProvider } from './contexts/CommentContext';
import CommentScreen from './screens/CommentScreen';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <CommentContextProvider>
        <View style={{ margin: 20, flex: 1 }}>
          <CommentScreen />
        </View>
      </CommentContextProvider>
    </Provider>
  );
};

export default App;
