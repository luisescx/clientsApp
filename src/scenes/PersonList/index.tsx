import React, { useCallback } from 'react';
import { Alert, FlatList, ListRenderItemInfo, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import usePersons from '~/hooks/usePersons';
import { PersonCard } from '~/components';
import Icon from '~/components/Icon';
import { Container, Content, SyncButton } from './styles';

const PersonList = () => {
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

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Content>
        <FlatList
          data={persons}
          keyExtractor={item => String(item.idPerson)}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        />

        <SyncButton onPress={handleNewPerson}>
          <Icon color={colors.white} name="plus" />
        </SyncButton>
      </Content>
    </Container>
  );
};

export default PersonList;
