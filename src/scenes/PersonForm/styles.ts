import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Input } from '~/components';
import { Color } from '~/styles/colors';

const ContainerAttrs = () => ({
  keyboardShouldPersistTaps: 'handled',
});

export const Container = styled.ScrollView.attrs(ContainerAttrs)`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding: 16px;
`;

export const InputForm = styled(Input)`
  margin-bottom: 16px;
`;

const paddingBottom = Platform.select({
  ios: getBottomSpace() === 0 ? 16 : getBottomSpace(),
  default: 16,
});

export const FooterContainer = styled.View`
  background: ${({ theme }) => theme.colors.white};
  bottom: 0;
  flex-direction: row;
  left: 0;
  padding: 15px;
  padding-bottom: ${paddingBottom}px;
  position: absolute;
  width: 100%;

  ${({ theme }) => theme.shadows.s1};
`;

interface ButtonLabelProps {
  color?: Color;
}

export const ButtonLabel = styled.Text<ButtonLabelProps>`
  color: ${({ theme, color }) => color || theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.poppinsMedium};
  font-size: 12px;
`;

export const FooterSeparator = styled.View`
  height: 100%;
  width: 16px;
`;
