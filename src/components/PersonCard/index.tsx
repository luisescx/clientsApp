import React, { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { formatDateToString } from '~/utils';
import Icon from '../Icon';
import {
  Button,
  ButtonContainer,
  ButtonLabel,
  ButtonSeparator,
  PersonCardContainer,
  PersonCardContent,
  PersonName,
  Separator,
  AdmissionDate,
} from './styles';

interface PersonCardProps {
  person: Person;
  onPressDeletePerson: (id: number) => void;
  OnPressEditPerson: (person: Person) => void;
}

const PersonCard = ({
  person,
  onPressDeletePerson,
  OnPressEditPerson,
}: PersonCardProps) => {
  const { idPerson, admissionDate, name } = person;

  const { colors } = useTheme();

  const admissionDateFormatted = useMemo(() => {
    return formatDateToString(admissionDate as Date);
  }, [admissionDate]);

  const firstName = useMemo(() => {
    return name.includes(' ') ? name.substring(0, name.indexOf(' ')) : name;
  }, [name]);

  const handleDeletePerson = useCallback(async () => {
    onPressDeletePerson(idPerson);
  }, [onPressDeletePerson, idPerson]);

  const handleEditPerson = useCallback(() => {
    OnPressEditPerson(person);
  }, [person, OnPressEditPerson]);

  return (
    <PersonCardContainer>
      <PersonCardContent>
        <PersonName>Nome: {firstName}</PersonName>
        <AdmissionDate>{`Data de Admissão: ${admissionDateFormatted}`}</AdmissionDate>

        <Separator />

        <ButtonContainer>
          <Button onPress={handleEditPerson}>
            <Icon name="pencil" color={colors.warning} size={20} />
            <ButtonLabel isEdit>Editar</ButtonLabel>
          </Button>

          <ButtonSeparator />

          <Button onPress={handleDeletePerson}>
            <Icon name="trash" color={colors.error} size={20} />
            <ButtonLabel isEdit={false}>Excluir</ButtonLabel>
          </Button>
        </ButtonContainer>
      </PersonCardContent>
    </PersonCardContainer>
  );
};

export default PersonCard;
