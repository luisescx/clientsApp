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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);

      setPersons(await getPersonsUseCase());
    } catch (e) {
      Alert.alert(`${e}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePerson = useCallback(
    async (id: number) => {
      try {
        setIsLoading(true);

        const isDeleted = await deletePersonUseCase(id);

        if (isDeleted) {
          const newPersons = persons.filter(({ idPerson }) => idPerson !== id);

          setPersons(newPersons);

          Alert.alert('Colaborador excluído com sucesso');
        }

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        Alert.alert(`${e}`);
      }
    },
    [persons],
  );

  const updatePerson = useCallback(
    async (person: Person) => {
      try {
        setIsLoading(true);

        const updatedPerson = await updatePersonUseCase(person);

        if (updatedPerson) {
          const index = persons.findIndex(
            ({ idPerson }) => idPerson === updatedPerson.idPerson,
          );

          if (index !== -1) {
            const newList = [...persons];

            Object.assign(newList[index], { ...updatedPerson });

            setPersons(newList);
            setIsLoading(false);

            Alert.alert('Coloborador atualizado com sucesso');

            return;
          }
        }

        setIsLoading(false);
        Alert.alert('Erro ao atualizar colaborador');
      } catch (e) {
        setIsLoading(false);

        Alert.alert(`${e}`);
      }
    },
    [persons],
  );

  const createPerson = useCallback(async (person: Person) => {
    try {
      setIsLoading(true);
      const createdPerson = await createPersonUseCase(person);

      if (createdPerson) {
        setPersons(prevState => [...prevState, createdPerson]);
        setIsLoading(false);
        Alert.alert('Coloborador criado com sucesso');

        return;
      }

      setIsLoading(false);
      Alert.alert('Erro ao criar colaborador');
    } catch (e) {
      setIsLoading(false);
      Alert.alert(`${e}`);
    }
  }, []);

  const value = useMemo(
    () => ({
      persons,
      isLoading,
      deletePerson,
      updatePerson,
      createPerson,
    }),
    [persons, isLoading, deletePerson, updatePerson, createPerson],
  );

  useEffect(() => {
    load();
  }, [load]);

  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

export default PersonProvider;
