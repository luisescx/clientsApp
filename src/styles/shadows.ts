import { Platform } from 'react-native';
import {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

interface ShadowProps {
  s1: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const shadow1 = Platform.select({
  ios: 'box-shadow: 0px 4px 16px rgba(59, 59, 59, 0.04);',
  android: 'elevation: 2;',
});

const shadows: ShadowProps = {
  s1: css`
    ${shadow1};
  `,
};

export default shadows;
