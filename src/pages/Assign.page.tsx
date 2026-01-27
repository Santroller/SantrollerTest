import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  List,
  MultiSelect,
  Select,
  Text,
} from '@mantine/core';
import { Layout } from '@/components/Layout/Layout';
import { RequireDevice } from '@/components/RequireDevice/RequireDevice';
import { useConfigStore } from '@/components/SettingsContext/SettingsContext';

export function AssignPage() {
  const profiles = useConfigStore((state) => state.config.profiles!);
  return (
    <>
      <Layout>
        <RequireDevice>
          <Text>
            A santroller device supports showing up as more than one controller at a time with
            supported systems. This allows doing things like connecting multiple controllers to a
            usb hub, or using a xbox 360 wireless receiver, or a multitap and having santroller
            present itself as a controller for each device. Because of this, you need to tell
            santroller how you want to handle different classes of devices, and so you need to
            assign profiles. Santroller also supports copilot gamepads, where you can have a gamepad
            and another controller plugged into a usb hub, and have them act as a single controller.
            This is mostly useful for drum kits, as this means you can have a regular gamepad
            plugged in for inputs, while also supporting inputs over MIDI. Assignments are first
            come first served, meaning if you have multiple profiles assigned to the same type of
            device, the first matching profile will be used. Note that a copilot gamepad is
            optional, which means if you have a drum profile with copilot first and a gamepad
            profile second, plugging in both a drum kit and a gamepad will result in only a drum kit
            being emulated, but plugging in just a gamepad will result only a gamepad being
            emulated.
          </Text>
          <Text>Supported systems for mulitple device emulation:</Text>
          <List>
            <List.Item>PS2 (emulates a multitap over PS2 controller emulation)</List.Item>
            <List.Item>macOS / Linux</List.Item>
            <List.Item>Windows (HID and XInput)</List.Item>
            <List.Item>Xbox 360</List.Item>
            <List.Item>PS4 (when in native PS4 mode)</List.Item>
            <List.Item>PS5 (when in native PS5 mode)</List.Item>
            <List.Item>Xbox One (emulates a wireless legacy adapter)</List.Item>
          </List>
        </RequireDevice>
        <Grid>
          <Grid.Col span={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Select
                label="Profile"
                data={profiles.map((x) => ({ label: x.name, value: x.uid.toString() }))}
              />
              <MultiSelect label="Consoles" placeholder="Any console" data={['Any']} />
              <MultiSelect label="Devices" placeholder="Any device" data={['Any']} />
            </Card>
          </Grid.Col>
        </Grid>
      </Layout>
    </>
  );
}
