import { IconExclamationCircle } from '@tabler/icons-react';
import { Alert, Button } from '@mantine/core';
import { Layout } from '@/components/Layout/Layout';
import { useConfigStore } from '@/components/SettingsContext/SettingsContext';

export function ConnectPage() {
  const connect = useConfigStore((state) => state.connect);
  const disconnect = useConfigStore((state) => state.disconnect);
  const connected = useConfigStore((state) => state.connected);
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
      </Layout>
    </>
  );
}
