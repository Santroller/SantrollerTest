import { useState } from 'react';
import { Anchor, Text, Title, Card, Center, Image, Badge, Button, InputBase, Input, Tabs, Group, SimpleGrid, NumberInput, useCombobox, Combobox } from '@mantine/core';
import classes from './Input.module.css';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
const devices = ['Wii Extension (GP18/GP19)', 'Digital Pin', 'Analog Pin'];
const inputs = ['Green Fret', 'Red Fret', 'Yellow Fret', 'Guitar Detected', 'Green Fret Held'];
type Props = {
  img?: string;
  name: string;
  device: string;
  input: string;
};
export function SantrollerInput({ img, name, device, input }: Props) {
  const [inputValue, setInputValue] = useState<string>(input);
  const [deviceValue, setDeviceValue] = useState<string>(device);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const inputCombobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const options = devices.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));
  const inputOptions = inputs.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {img && <Card.Section>
          <Center>
            <Image
              src={img}
              height={160}
              w="auto"
              fit="contain"
              alt="Norway"
            />
          </Center>
        </Card.Section>}


        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{name}</Text>
        </Group>

        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            setDeviceValue(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              label="Device"
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
        <Combobox
          store={inputCombobox}
          onOptionSubmit={(val) => {
            setInputValue(val);
            inputCombobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              label="Input"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
              onClick={() => inputCombobox.toggleDropdown()}
            >
              {inputValue || <Input.Placeholder>Pick value</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>{inputOptions}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Card>


    </>
  );
}
