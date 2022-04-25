import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, ListRenderItemInfo, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import usePersons from '~/hooks/usePersons';
import { PersonCard } from '~/components';
import Icon from '~/components/Icon';
import InputSearch from './components/InputSearch';
import { Container, Content, Header, AddButton, SyncButton } from './styles';

const PersonList = () => {
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [isDataFiltered, setFilteredData] = useState(false);
  const [clearSearch, setClearSearch] = useState(false);

  const { colors } = useTheme();

  const { persons, deletePerson } = usePersons();

  const { navigate } = useNavigation();

  const handleDeletePerson = useCallback(
    async (id: number) => {
      Alert.alert('Excluir Colaborador', 'Deseja excluir colaborador?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Confirmar', onPress: async () => deletePerson(id) },
      ]);
    },
    [deletePerson],
  );

  const handleEditPerson = useCallback(
    (person: Person) => {
      navigate('PersonForm', {
        person,
        isCreatePerson: false,
      });
    },
    [navigate],
  );

  const handleNewPerson = useCallback(() => {
    navigate('PersonForm', {
      person: {} as Person,
      isCreatePerson: true,
    });
  }, [navigate]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Person>) => {
      return (
        <PersonCard
          person={item}
          onPressDeletePerson={handleDeletePerson}
          OnPressEditPerson={handleEditPerson}
        />
      );
    },
    [handleDeletePerson, handleEditPerson],
  );

  const filterData = useCallback(
    (text: string) => {
      const data = [...persons];

      const newPersonsList = data.filter((person: Person) => {
        const name = person.name.includes(' ')
          ? person.name.substring(0, person.name.indexOf(' '))
          : person.name;

        return name.toLowerCase().includes(text.toLowerCase().trim());
      });

      setFilteredPersons(newPersonsList);
      setFilteredData(true);
    },
    [persons],
  );

  const reloadPersons = useCallback(() => {
    setFilteredPersons(persons);
    setFilteredData(false);
    setClearSearch(true);

    setTimeout(() => {
      setClearSearch(false);
    }, 500);
  }, [persons]);

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header>
        <InputSearch
          isValueEmpty={clearSearch}
          handleInputSearch={filterData}
          placeholder="Buscar por nome"
        />
      </Header>

      <Content>
        <FlatList
          data={filteredPersons}
          keyExtractor={item => String(item.idPerson)}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        />

        {isDataFiltered && (
          <SyncButton onPress={reloadPersons}>
            <Icon color={colors.white} name="reload" />
          </SyncButton>
        )}

        <AddButton onPress={handleNewPerson}>
          <Icon color={colors.white} name="plus" />
        </AddButton>
      </Content>
    </Container>
  );
};

export default PersonList;
