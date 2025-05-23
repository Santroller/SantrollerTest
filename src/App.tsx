import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { useReducer } from 'react';
import { configReducer, initialConfig, SettingsContext, SettingsDispatchContext } from './components/SettingsContext/SettingsContext';

export default function App() {
  const [conf, dispatch] = useReducer(configReducer, initialConfig);
  return (
    <MantineProvider theme={theme}>
      <SettingsContext value={conf}><SettingsDispatchContext value={dispatch}>
        <Router />
      </SettingsDispatchContext></SettingsContext>
    </MantineProvider>
  );
}
