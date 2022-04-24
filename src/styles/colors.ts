const colors = {
  background: '#E8EEF4',
  primary200: '#083350',
  primary100: '#335B78',

  success: '#26AF46',
  successLight: '#E4FFEB',

  warning: '#E78F0B',
  warningLight: '#FFEDD3',

  error: '#CF1E2A',
  errorLight: '#FFEAEB',

  neutral200: '#A2B2BF',
  neutral100: '#E8EEF4',

  black: '#000000',
  white: '#FFFFFF',
};

type Keys = keyof typeof colors;

export type Color = typeof colors[Keys];

export default colors;
