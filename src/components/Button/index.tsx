import React, { useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Color } from '~/styles/colors';
import { ButtonContainer } from './styles';

export interface ButtonProps extends TouchableOpacityProps {
  type?: 'default' | 'outlined';
  color?: Color;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  color,
  children,
  ...rest
}: ButtonProps) => {
  const { colors } = useTheme();

  const buttonColor = useMemo(() => {
    return color || colors.success;
  }, [color, colors.success]);

  return (
    <ButtonContainer
      type={type || 'default'}
      color={buttonColor}
      activeOpacity={0.7}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      {...rest}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
