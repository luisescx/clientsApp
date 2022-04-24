import { useContext } from 'react';
import { PersonContext } from '~/contexts/PersonContext';

const usePersons = () => {
  const context = useContext(PersonContext);

  if (context) {
    return context;
  }

  throw new Error('Persons provider must be setter.');
};

export default usePersons;
