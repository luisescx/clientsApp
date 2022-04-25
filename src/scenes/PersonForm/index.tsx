import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, StatusBar, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import usePersons from '~/hooks/usePersons';
import { Button, Loading } from '~/components';
import { formatDateToString, parseStringToDate } from '~/utils';
import { AppStackParamsList } from '~/types/navigation';
import {
  ButtonLabel,
  Container,
  FooterContainer,
  FooterSeparator,
  InputForm,
} from './styles';

const PersonForm = () => {
  const { params } = useRoute<RouteProp<AppStackParamsList, 'PersonForm'>>();
  const { person, isCreatePerson } = params;

  const { colors } = useTheme();

  const { goBack, navigate } = useNavigation();

  const { updatePerson, createPerson, isLoading } = usePersons();

  const [personForm, setPersonForm] = useState<Person>(
    {
      ...person,
      admissionDate: person?.admissionDate
        ? formatDateToString(person?.admissionDate as Date)
        : '',
      birthDate: person?.admissionDate
        ? formatDateToString(person?.birthDate as Date)
        : '',
    } || ({} as Person),
  );

  const handleChangeText = useCallback(
    (text: string, type: AttributesTypes) => {
      setPersonForm(prevState => {
        return { ...prevState, [type]: text };
      });
    },
    [],
  );

  const onSubmit = useCallback(async () => {
    if (!personForm.name || personForm.name === '') {
      Alert.alert('Nome é obrigatório');
      return;
    }
    if (!personForm.cpf || personForm.cpf === '') {
      Alert.alert('CPF é obrigatório');
      return;
    }
    if (!personForm.rg || personForm.rg === '') {
      Alert.alert('RG é obrigatório');
      return;
    }
    if (!personForm.admissionDate || personForm.admissionDate === '') {
      Alert.alert('Data de admissão é obrigatório');
      return;
    }
    if (!personForm.birthDate || personForm.birthDate === '') {
      Alert.alert('Data de nascimento é obrigatório');
      return;
    }

    if (isCreatePerson) {
      const newPerson = { ...personForm };
      newPerson.admissionDate = parseStringToDate(
        newPerson.admissionDate as string,
      );
      newPerson.birthDate = parseStringToDate(newPerson.birthDate as string);

      await createPerson(newPerson);
      navigate('PersonList');

      return;
    }

    const personToSave = {} as Person;
    const personKeys = Object.keys(person);

    personKeys.forEach(key => {
      if (person[key as keyof Person] !== personForm[key as keyof Person]) {
        personToSave[key as keyof Person] = personForm[key as keyof Person];

        if (key === 'admissionDate' || key === 'birthDate') {
          personToSave[key as keyof Person] = parseStringToDate(
            personToSave[key as keyof Person] as string,
          );
        }
      }
    });

    personToSave.idPerson = person.idPerson;
    await updatePerson(personToSave);

    navigate('PersonList');
  }, [
    createPerson,
    isCreatePerson,
    navigate,
    person,
    personForm,
    updatePerson,
  ]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <InputForm
              label="Nome"
              placeholder="Digite o nome"
              value={personForm.name}
              onChangeText={text => handleChangeText(text, 'name')}
              autoCapitalize="words"
            />

            <InputForm
              label="CPF"
              placeholder="Digite o CPF"
              maskType="cpf"
              value={personForm.cpf}
              onChangeText={text => handleChangeText(text, 'cpf')}
            />

            <InputForm
              label="RG"
              placeholder="Digite o RG"
              value={personForm.rg}
              keyboardType="number-pad"
              onChangeText={text => handleChangeText(text, 'rg')}
            />

            <InputForm
              label="Data de Nascimento"
              placeholder="Digite a Data de Nascimento"
              value={personForm.birthDate as string}
              maskType="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              onChangeText={text => handleChangeText(text, 'birthDate')}
            />

            <InputForm
              label="Data de Admissão"
              placeholder="Digite a Data de Admissão"
              value={personForm.admissionDate as string}
              maskType="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              onChangeText={text => handleChangeText(text, 'admissionDate')}
            />

            <InputForm
              label="Função"
              placeholder="Digite a função"
              value={personForm.occupation}
              onChangeText={text => handleChangeText(text, 'occupation')}
            />
          </Container>

          <FooterContainer>
            <Button
              color={colors.primary200}
              type="outlined"
              style={{ flex: 1 }}
              onPress={goBack}
            >
              <ButtonLabel color={colors.primary200}>Cancelar</ButtonLabel>
            </Button>

            <FooterSeparator />

            <Button
              color={colors.primary200}
              style={{ flex: 1 }}
              onPress={onSubmit}
            >
              <ButtonLabel>Confirmar</ButtonLabel>
            </Button>
          </FooterContainer>
        </>
      )}
    </>
  );
};

export default PersonForm;
