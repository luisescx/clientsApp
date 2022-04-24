import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from '~/styles/themes';
import PersonProvider from './PersonContext';

interface ContextsProps {
  children: React.ReactNode;
}

const Contexts: React.FC<ContextsProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <PersonProvider>{children}</PersonProvider>
    </ThemeProvider>
  );
};

export default Contexts;
