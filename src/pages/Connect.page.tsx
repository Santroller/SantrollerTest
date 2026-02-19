import { IconExclamationCircle } from '@tabler/icons-react';
import { Alert, Button, Space, Text } from '@mantine/core';
import { Layout } from '@/components/Layout/Layout';
import { useConfigStore } from '@/components/SettingsContext/SettingsContext';
import { useTranslation } from 'react-i18next';

export function ConnectPage() {
  const connect = useConfigStore((state) => state.connect);
  const disconnect = useConfigStore((state) => state.disconnect);
  const connected = useConfigStore((state) => state.connected);
  const { t } = useTranslation();
  return (
    <>
      <Layout>
        {!navigator.hid && (
          <Alert
            variant="light"
            color="red"
            title="Browser Unsupported"
            icon={<IconExclamationCircle />}
          >
            This browser is not supported as it does not support WebHID.
          </Alert>
        )}
        {navigator.hid && connected && (
          <Button onClick={disconnect}>Disconnect from Santroller</Button>
        )}
        {navigator.hid && !connected && <Button onClick={connect}>Connect to Santroller</Button>}
        <Space h="md" />
        <Text size="h1">{t('getting_started.title')}</Text>
        <Text size="sm">{t('getting_started.text')}</Text>
        <Space h="md" />
        <Button component="a" download="santroller.uf2" href="santroller.uf2" target="_blank">
          Download uf2
        </Button>
      </Layout>
    </>
  );
}
