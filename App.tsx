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

import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {userContext} from './contexts/userContext';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './pages/navigation.component';
import {default as defTheme} from './assets/theme.json';
import {ThemeContext} from './contexts/theme';

const App = () => {
  const [userToken, setUserToken] = useState({
    accessToken: null,
    refreshToken: null,
  });
  const [theme, setTheme] = useState('dark');
  const [test, setTest] = useState(eva.light);
  const toggleTheme = () => {
    if (theme === 'light') {
      setTest(eva.light);
    } else if (theme === 'dark') {
      setTest(eva.dark);
    }
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };
  return (
    <React.Fragment>
      <userContext.Provider value={{userToken, setUserToken}}>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <AppNavigator />
          </ApplicationProvider>
        </ThemeContext.Provider>
      </userContext.Provider>
    </React.Fragment>
  );
};

export default App;
