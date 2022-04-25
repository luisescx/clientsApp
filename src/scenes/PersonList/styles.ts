import { Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 24px 0 24px;
`;

const margin = Platform.select({
  ios: {
    marginTop: getStatusBarHeight(),
    marginBottom: getBottomSpace(),
  },
  android: {
    marginTop: 0,
    marginBottom: 0,
  },
});

export const Content = styled.View`
  flex: 1;
  margin: ${margin?.marginTop}px 0 ${margin?.marginTop}px;
`;
