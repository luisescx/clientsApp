import styled from 'styled-components/native';

export const PersonCardContainer = styled.View`
  margin-bottom: 16px;
`;

export const PersonCardContent = styled.View`
  background: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 16px;

  ${({ theme }) => theme.shadows.s1};
`;

export const PersonName = styled.Text`
  color: ${({ theme }) => theme.colors.primary100};
  font-family: ${({ theme }) => theme.fonts.poppinsMedium};
  font-size: 16px;
`;

export const AdmissionDate = styled.Text`
  color: ${({ theme }) => theme.colors.primary100};
  font-family: ${({ theme }) => theme.fonts.poppinsRegular};
  font-size: 14px;
`;

export const Separator = styled.View`
  background: ${({ theme }) => theme.colors.neutral100};
  height: 1px;
  margin: 16px 0;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonAttrs = () => ({
  activeOpacity: 0.5,
  hitSlop: { top: 8, right: 8, bottom: 8, left: 8 },
});

export const Button = styled.TouchableOpacity.attrs(ButtonAttrs)`
  flex-direction: row;
  align-items: center;
`;

export const ButtonSeparator = styled.View`
  background-color: ${({ theme }) => theme.colors.neutral200};
  height: 100%;
  width: 1px;
`;

interface PersonCardButtonLabelProps {
  isEdit: boolean;
}

export const ButtonLabel = styled.Text<PersonCardButtonLabelProps>`
  color: ${({ theme, isEdit }) =>
    isEdit ? theme.colors.warning : theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.poppinsMedium};
  font-size: 14px;
  margin-left: 8px;
`;
