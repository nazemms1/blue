import { createTheme } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  defaultRadius: 'md',
  colors: {
     blue: [
      '#e7f5ff',
      '#d0ebff',
      '#a5d8ff',
      '#74c0fc',
      '#4dabf7',
      '#339af0',
      '#228be6',
      '#1971c2',
      '#1864ab',
      '#145591',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: '#f8f9fa',
        },
      },
    },
  },
})
