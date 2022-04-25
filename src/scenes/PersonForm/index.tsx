import React, { useCallback, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import usePersons from '~/hooks/usePersons';
import { Button } from '~/components';
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
  const { person } = params;

  const { colors } = useTheme();

  const { goBack } = useNavigation();

  const { updatePerson } = usePersons();

  const [personForm, setPersonForm] = useState<Person>(
    {
      ...person,
      admissionDate: formatDateToString(person?.admissionDate as Date),
      birthDate: formatDateToString(person?.birthDate as Date),
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
    if (!personForm.admissionDate) {
      Alert.alert('Data de admissão é obrigatório');
      return;
    }
    if (!personForm.birthDate) {
      Alert.alert('Data de nascimento é obrigatório');
      return;
    }

    const personToSave = {} as Person;

    const personKeys = Object.keys(person);

    personKeys.forEach(key => {
      if (person[key as keyof Person] !== personForm[key as keyof Person]) {
        personToSave[key as keyof Person] = personForm[key as keyof Person];

        if (key === 'admissionDate' || key === 'birthDate') {
          personToSave[key as keyof Person] = new Date(
            parseStringToDate(personToSave[key as keyof Person] as string),
          );
        }
      }
    });

    personToSave.idPerson = person.idPerson;

    await updatePerson(personToSave);
  }, [person, personForm, updatePerson]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Container>
        <InputForm
          label="Nome"
          placeholder="Digite o nome"
          value={personForm.name}
          onChangeText={text => handleChangeText(text, 'name')}
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
  );
};

export default PersonForm;
