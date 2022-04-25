import React, {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import createPersonUseCase from '~/useCases/CreatePersonUseCase';
import deletePersonUseCase from '~/useCases/DeletePersonUseCase';
import getPersonsUseCase from '~/useCases/GetPersonsUseCase';
import updatePersonUseCase from '~/useCases/UpdatePersonUseCase';

interface PersonProps {
  persons: Person[];
  deletePerson: (id: number) => Promise<void>;
  updatePerson: (person: Person) => Promise<void>;
  createPerson: (person: Person) => Promise<void>;
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

  const updatePerson = useCallback(
    async (person: Person) => {
      try {
        const updatedPerson = await updatePersonUseCase(person);

        if (updatedPerson) {
          const index = persons.findIndex(
            ({ idPerson }) => idPerson === updatedPerson.idPerson,
          );

          if (index !== -1) {
            const newList = [...persons];

            Object.assign(newList[index], { ...updatedPerson });

            setPersons(newList);
            Alert.alert('Coloborador atualizado com sucesso');

            return;
          }
        }

        Alert.alert('Erro ao atualizar colaborador');
      } catch (e) {
        Alert.alert(`${e}`);
      }
    },
    [persons],
  );

  const createPerson = useCallback(async (person: Person) => {
    try {
      const createdPerson = await createPersonUseCase(person);

      if (createdPerson) {
        setPersons(prevState => [...prevState, createdPerson]);
        Alert.alert('Coloborador criado com sucesso');

        return;
      }

      Alert.alert('Erro ao criar colaborador');
    } catch (e) {
      Alert.alert(`${e}`);
    }
  }, []);

  const value = useMemo(
    () => ({
      persons,
      deletePerson,
      updatePerson,
      createPerson,
    }),
    [persons, deletePerson, updatePerson, createPerson],
  );

  useEffect(() => {
    load();
  }, [load]);

  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

export default PersonProvider;
