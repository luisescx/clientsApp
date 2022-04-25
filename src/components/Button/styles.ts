import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ButtonProps } from '.';

export const ButtonContainer = styled(TouchableOpacity)<ButtonProps>`
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  padding: 12px;

  ${({ type, color }) =>
    type === 'default' &&
    css`
      background: ${color};
    `}

  ${({ type, color }) =>
    type === 'outlined' &&
    css`
      border: 1px solid ${color};
    `}

    ${({ theme, disabled }) =>
    disabled &&
    css`
      background: ${theme.colors.neutral200};
    `}
`;
