import { TextInputMask } from 'react-native-masked-text';
import styled, { DefaultTheme } from 'styled-components/native';

const InputAttrs = ({ theme }: { theme: DefaultTheme }) => ({
  selectionColor: theme.colors.primary100,
  color: theme.colors.black,
  placeholderTextColor: theme.colors.neutral200,
});

export const StyledInput = styled.TextInput.attrs(InputAttrs)`
  border: 1px solid ${({ theme }) => theme.colors.primary200};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.poppinsRegular};
  font-size: 16px;
  line-height: 22px;
  margin-top: 4px;
  padding: 10px 8px;
`;

export const StyledMaskedInput = styled(TextInputMask).attrs(InputAttrs)`
  border: 1px solid ${({ theme }) => theme.colors.primary200};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.poppinsRegular};
  font-size: 16px;
  line-height: 22px;
  margin-top: 4px;
  padding: 10px 8px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.primary200};
`;
