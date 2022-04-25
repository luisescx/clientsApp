import { TextInput } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

const InputFieldAttrs = ({ theme }: { theme: DefaultTheme }) => ({
  placeholderTextColor: theme.colors.neutral200,
  selectionColor: theme.colors.primary200,
  color: theme.colors.black,
});

export const InputField = styled(TextInput).attrs(InputFieldAttrs)`
  border: 1px solid ${({ theme }) => theme.colors.primary200};
  flex: 1;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0 12px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.poppinsRegular};
`;

const InputButtonAttrs = () => ({
  activeOpacity: 0.7,
  hitSlop: { top: 8, right: 8, bottom: 8, left: 8 },
});

export const InputButton = styled.TouchableOpacity.attrs(InputButtonAttrs)`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.primary100 : theme.colors.primary200};
  padding: 12px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;
