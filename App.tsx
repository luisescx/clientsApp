import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Contexts from '~/contexts';
import Navigation from '~/navigations';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Contexts>
      <Navigation />
    </Contexts>
  );
};

export default App;
