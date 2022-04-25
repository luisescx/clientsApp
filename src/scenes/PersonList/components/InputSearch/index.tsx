import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from '~/components/Icon';
import { Container, InputButton, InputField } from './styles';

interface InputProps extends TextInputProps {
  handleInputSearch: (value: string) => void;
  isValueEmpty: boolean;
}

const InputSearch = ({
  handleInputSearch,
  isValueEmpty,
  ...rest
}: InputProps) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const { colors } = useTheme();

  const handleSearch = useCallback(() => {
    inputRef.current!.blur();
    handleInputSearch(inputValue);
  }, [handleInputSearch, inputValue]);

  useEffect(() => {
    if (isValueEmpty) {
      setInputValue('');
    }
  }, [isValueEmpty]);

  return (
    <Container>
      <InputField
        {...rest}
        ref={inputRef}
        value={inputValue}
        onChangeText={setInputValue}
        autoCapitalize="none"
        onSubmitEditing={handleSearch}
        autoCorrect={false}
        returnKeyType="send"
      />

      <InputButton onPress={handleSearch} disabled={false}>
        <Icon name="search" size={20} color={colors.white} />
      </InputButton>
    </Container>
  );
};

export default InputSearch;
