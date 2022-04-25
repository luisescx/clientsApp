import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { useTheme } from 'styled-components';
import { Label, StyledInput, StyledMaskedInput } from './styles';

export interface InputValidation {
  type: 'success' | 'error';
  message?: string;
}

export interface InputProps extends TextInputProps {
  label: string;
  maskType?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ value, label, maskType, options, onChangeText, ...rest }, ref) => {
    const { colors } = useTheme();

    return (
      <View>
        <Label>{label}</Label>
        {maskType ? (
          <StyledMaskedInput
            ref={ref}
            type={maskType}
            options={options}
            {...rest}
            value={value}
            selectionColor={colors.warning}
            onChangeText={onChangeText}
          />
        ) : (
          <StyledInput
            ref={ref}
            {...rest}
            value={value}
            selectionColor={colors.warning}
            onChangeText={onChangeText}
          />
        )}
      </View>
    );
  },
);

export default Input;
