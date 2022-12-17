/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';

import {Appearance} from 'react-native';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {userContext} from './contexts/userContext';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './pages/navigation.component';
import {default as defTheme} from './assets/theme.json';
import {ThemeContext} from './contexts/theme';
import {Provider} from 'react-redux';
import store from './app/store';

const App = () => {
  const appearance: any = Appearance.getColorScheme();
  console.log(appearance);
  const [userToken, setUserToken] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });
  const [theme, setTheme] = useState(appearance);
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  return (
    <React.Fragment>
      <userContext.Provider value={{userToken, setUserToken}}>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <Provider store={store}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva[theme]}>
              <AppNavigator />
            </ApplicationProvider>
          </Provider>
        </ThemeContext.Provider>
      </userContext.Provider>
    </React.Fragment>
  );
};

export default App;
