import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import Contexts from '~/contexts';
import Navigation from '~/navigations';

const App = () => {
  return (
    <Contexts>
      <Navigation />
    </Contexts>
  );
};

export default App;
