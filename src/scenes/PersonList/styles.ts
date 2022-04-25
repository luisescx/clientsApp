import { Platform, TouchableOpacity } from 'react-native';
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

export const SyncButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  bottom: 20px;
  right: 26px;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary200};
`;
