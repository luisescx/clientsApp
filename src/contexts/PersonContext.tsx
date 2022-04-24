import React, {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import deletePersonUseCase from '~/useCases/DeletePersonUseCase';
import getPersonsUseCase from '~/useCases/GetPersonsUseCase';

interface PersonProps {
  persons: Person[];
  deletePerson: (id: number) => Promise<void>;
}

interface PersonProviderProps {
  children: ReactNode;
}

export const PersonContext = createContext({} as PersonProps);

const PersonProvider: React.FC<PersonProviderProps> = ({ children }) => {
  const [persons, setPersons] = useState<Person[]>([]);

  const load = useCallback(async () => {
    try {
      setPersons(await getPersonsUseCase());
    } catch (e) {
      Alert.alert(`${e}`);
    }
  }, []);

  const deletePerson = useCallback(
    async (id: number) => {
      try {
        const isDeleted = await deletePersonUseCase(id);

        if (isDeleted) {
          const newPersons = persons.filter(({ idPerson }) => idPerson !== id);

          setPersons(newPersons);

          Alert.alert('Colaborador excluído com sucesso');
        }
      } catch (e) {
        Alert.alert(`${e}`);
      }
    },
    [persons],
  );

  const value = useMemo(
    () => ({
      persons,
      deletePerson,
    }),
    [persons, deletePerson],
  );

  useEffect(() => {
    load();
  }, [load]);

  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

export default PersonProvider;
