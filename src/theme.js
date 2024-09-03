import { Platform } from 'react-native'

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      buttonText: '#FFFFFF',
      primary: '#0366d6',
      error: '#d73a4a',
      button: '#007ACC',
      darkBackgroud: '#24292e',
      textOnDarkBackground: '#FFFFFF'
    },
    fontSizes: {
      body: 15,
      subheading: 17,
      input: 20,
      heading: 20
    },
    fonts: {
      main: 'System',
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    fontFamily: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    })
  }
  
  export default theme;