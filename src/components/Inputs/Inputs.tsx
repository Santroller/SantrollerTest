import { useState } from 'react';
import { TextInput, Space, Menu, Anchor, Text, Title, Card, Center, Image, Badge, Button, InputBase, Input, Tabs, Group, SimpleGrid, NumberInput, useCombobox, Combobox, ActionIcon, Affix } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Inputs.module.css';
import { IconPhoto, IconMessageCircle, IconSettings, IconPlus, IconRestore, IconTrash, IconPencil } from '@tabler/icons-react';
import { SantrollerInput } from '../Input/SantrollerInput';

export function InputsTab({ value }: { value: string }) {
  const [editing, { toggle }] = useDisclosure();

  return (
    <Tabs.Tab value={value}>
      <Group justify="center" gap="xs">
        {editing && <TextInput
          value={value}
        />}
        {!editing && <Text>{value}</Text>}
        <ActionIcon color="gray" variant="filled" aria-label="Edit" component="a" onClick={toggle}>
          <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="gray" variant="filled" aria-label="Delete" component="a" onClick={toggle}>
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Tabs.Tab>
  )
}
const devices = ['Guitar Hero Guitar'];
export function Inputs() {
  const [deviceValue, setDeviceValue] = useState<string>("Guitar Hero Guitar");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const options = devices.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));
  return (
    <>
      <Tabs defaultValue="Guitar Hero Guitar">
        <Tabs.List>
          <InputsTab value="Guitar Hero Guitar" />
          <InputsTab value="Rock Band Guitar" />
          <InputsTab value="Guitar Hero Drums" />
          <InputsTab value="Fortnite Festival Keyboard" />
          <Tabs.Tab value="add">
            <IconPlus size={14} />
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Guitar Hero Guitar">
        <Space h="md" />
        <Title order={2}>Settings</Title>
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setDeviceValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              label="Device to emulate"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => combobox.toggleDropdown()}
            >
              {deviceValue || <Input.Placeholder>Pick value</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{options}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
          <Space h="md" />
          <Title order={3}>Activation method</Title>
          <SimpleGrid cols={3}>
            <SantrollerInput name="Activation Method" device="Wii Extension" input="Green Fret Held" />
            <SantrollerInput name="Activation Method" device="Wii Extension" input="Guitar Plugged in" />
            <SantrollerInput name="Activation Method" device="USB Host" input="Guitar Plugged in" />
          </SimpleGrid>
          <Space h="md" />
          <Title order={3}>Inputs</Title>
          <SimpleGrid cols={3}>
            <SantrollerInput name="Green Fret" device="Wii Extension" input="Green Fret" img="Icons/GuitarHeroGuitar/Green.png" />
            <SantrollerInput name="Red Fret" device="Wii Extension" input="Red Fret" img="Icons/GuitarHeroGuitar/Red.png" />
            <SantrollerInput name="Yellow Fret" device="Wii Extension" input="Yellow Fret" img="Icons/GuitarHeroGuitar/Yellow.png" />

          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          Messages tab content
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
      <Affix position={{ bottom: 40, right: 40 }}>
        <Menu shadow="md" width={150}>
          <Menu.Target>
            <ActionIcon color="blue" radius="xl" size={60}>
              <IconPlus stroke={1.5} size={30} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconPlus size={14} />}>
              Add Activation Method
            </Menu.Item>
            <Menu.Item leftSection={<IconPlus size={14} />}>
              Add Input
            </Menu.Item>
            <Menu.Item leftSection={<IconRestore size={14} />}>
              Load Defaults
            </Menu.Item>
            <Menu.Item leftSection={<IconTrash size={14} />}>
              Clear all
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Affix>


    </>
  );
}
