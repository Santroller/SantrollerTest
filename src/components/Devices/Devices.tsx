import { useContext } from 'react';
import { Flex, SegmentedControl, Menu, Title, Card, Center, Image, Badge, InputBase, Input, SimpleGrid, useCombobox, Combobox, ActionIcon, Affix } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { SettingsContext, SettingsDispatchContext, proto } from '../SettingsContext/SettingsContext';
import '../../i18n/config';
import { useTranslation } from 'react-i18next';
import { I2CGroups, I2CPins, SPIGroups, SPIPins } from '@/devices/pico/pins';

function PinBox({ pin, valid, error, label, dispatch }: { pin: number, valid: { [pin: number]: string }, error: string, label: string, dispatch: (pin: number) => void }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = Object.entries(valid).map((item) => (
    <Combobox.Option value={item[0]} key={item[0]}>
      {item[1]}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        dispatch(Number(val))
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          error={error}
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {valid[pin] || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

function I2CDevice({ device, dispatch }: { device: proto.II2CDevice, dispatch: (device: proto.II2CDevice) => void }) {
  const { t } = useTranslation();
  const error = I2CGroups[device.sda] !== I2CGroups[device.scl] && t("i2c.incorrect_group") || ""
  const SdaPins = Object.fromEntries(
    Object.entries(I2CPins).flatMap(group => group[1].sda.map(pin => [pin, t("i2c.sda.pin", { channel: group[0], pin })]))
  )
  const SclPins = Object.fromEntries(
    Object.entries(I2CPins).flatMap(group => group[1].scl.map(pin => [pin, t("i2c.scl.pin", { channel: group[0], pin })]))
  )
  return (
    <>
      <PinBox label={t("i2c.sda.label")} error={error} pin={device.sda} valid={SdaPins} dispatch={(pin) => dispatch({ ...device, sda: pin })} />
      <PinBox label={t("i2c.scl.label")} error={error} pin={device.scl} valid={SclPins} dispatch={(pin) => dispatch({ ...device, scl: pin })} />
    </>
  )
}

function SPIDevice({ device, dispatch }: { device: proto.ISPIDevice, dispatch: (device: proto.ISPIDevice) => void }) {
  const { t } = useTranslation();
  const error = new Set([SPIGroups[device.mosi], SPIGroups[device.miso], SPIGroups[device.sck]]).size !== 1 && t("spi.incorrect_group") || ""
  const MosiPins = Object.fromEntries(
    Object.entries(SPIPins).flatMap(group => group[1].mosi.map(pin => [pin, t("spi.mosi.pin", { channel: group[0], pin })]))
  )
  const MisoPins = Object.fromEntries(
    Object.entries(SPIPins).flatMap(group => group[1].miso.map(pin => [pin, t("spi.miso.pin", { channel: group[0], pin })]))
  )
  const SckPins = Object.fromEntries(
    Object.entries(SPIPins).flatMap(group => group[1].sck.map(pin => [pin, t("spi.sck.pin", { channel: group[0], pin })]))
  )
  return (
    <>
      <PinBox label={t("spi.mosi.label")} error={error} pin={device.mosi} valid={MosiPins} dispatch={(pin) => dispatch({ ...device, mosi: pin })} />
      <PinBox label={t("spi.miso.label")} error={error} pin={device.miso} valid={MisoPins} dispatch={(pin) => dispatch({ ...device, miso: pin })} />
      <PinBox label={t("spi.sck.label")} error={error} pin={device.sck} valid={SckPins} dispatch={(pin) => dispatch({ ...device, sck: pin })} />
    </>
  )
}

function DeviceCard({ id, title, image, children }: { id: string, title: string, image: string, children: React.ReactNode }) {
  const { t } = useTranslation();
  const config = useContext(SettingsContext);
  const badge = config.deviceStatus[id].connected ?
    <Badge size="md" color="blue">{t("connected")}</Badge> :
    <Badge size="md" color="red">{t("disconnected")}</Badge>;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Center>
          <Image
            src={image}
            height={160}
            w="auto"
            fit="contain"
            alt={title}
          />
        </Center>
      </Card.Section>
      <Flex mt="md" mb="xs" justify="center" align="center" gap="xs">
        <Title order={2} fw={500} >{title}</Title> {badge}
      </Flex>
      {children}
    </Card>
  )
}

function MappingMode({ mode, dispatch }: { mode: proto.MappingMode, dispatch: (device: proto.MappingMode) => void }) {
  const { t } = useTranslation();
  const data = [
    { label: t("mapping_mode.per_input"), value: proto.MappingMode.PerInput.toString() },
    { label: t("mapping_mode.per_extension"), value: proto.MappingMode.PerExtension.toString() }
  ]
  return (
    <Input.Wrapper label={t("mapping_mode.label")} description={t("mapping_mode.description")}>
      <SegmentedControl
        fullWidth
        data={data}
        value={mode.toString()}
        onChange={(val) => dispatch(Number(val))}
      />
    </Input.Wrapper>
  )
}

function WiiExtensionDevice({ device, id }: { device: proto.IDevice, id: string }) {
  const dispatch = useContext(SettingsDispatchContext);
  const { t } = useTranslation();
  if (!device.wii) {
    throw new Error("device null!")
  }
  const wii = device.wii
  return (
    <DeviceCard id={id} title={t('devices.wii_extension')} image="covers/Wii.svg.png">
      <I2CDevice device={wii.i2c} dispatch={(val) => dispatch({ type: "updateDevice", device: { wii: { ...wii, i2c: val } }, id })} />
      <MappingMode mode={wii.mappingMode} dispatch={(val) => dispatch({ type: "updateDevice", device: { wii: { ...wii, mappingMode: val } }, id })} />
    </DeviceCard>
  )
}

function BandHeroDrumDevice({ device, id }: { device: proto.IDevice, id: string }) {
  const dispatch = useContext(SettingsDispatchContext);
  const { t } = useTranslation();
  if (!device.bhDrum) {
    throw new Error("device null!")
  }
  const bhDrum = device.bhDrum
  return (
    <DeviceCard id={id} title={t('devices.band_hero_drums')} image="covers/bandhero.png">
      <I2CDevice device={bhDrum.i2c} dispatch={(val) => dispatch({ type: "updateDevice", device: { bhDrum: { ...bhDrum, i2c: val } }, id })} />
    </DeviceCard>
  )
}
function WorldTourDrumDevice({ device, id }: { device: proto.IDevice, id: string }) {
  const dispatch = useContext(SettingsDispatchContext);
  const { t } = useTranslation();
  if (!device.worldTourDrum) {
    throw new Error("device null!")
  }
  const worldTourDrum = device.worldTourDrum
  return (
    <DeviceCard id={id} title={t('devices.world_tour_drums')} image="covers/ghwt.jpg">
      <SPIDevice device={worldTourDrum.spi} dispatch={(val) => dispatch({ type: "updateDevice", device: { worldTourDrum: { ...worldTourDrum, spi: val } }, id })} />
    </DeviceCard>
  )
}
function MPU6050Device({ device, id }: { device: proto.IDevice, id: string }) {
  const dispatch = useContext(SettingsDispatchContext);
  const { t } = useTranslation();
  if (!device.mpu6050) {
    throw new Error("device null!")
  }
  const mpu6050 = device.mpu6050
  return (
    <DeviceCard id={id} title={t('devices.adxl345')} image="covers/mpu6050.png">
      <I2CDevice device={mpu6050.i2c} dispatch={(val) => dispatch({ type: "updateDevice", device: { mpu6050: { ...mpu6050, i2c: val } }, id })} />
    </DeviceCard>
  )
}

export function Devices() {
  const config = useContext(SettingsContext);
  return (
    <>
      <SimpleGrid cols={3}>
        {Object.entries(config.devices).map(([id, device]) =>
          device.wii && <WiiExtensionDevice device={device} key={id} id={id} />
          || device.bhDrum && <BandHeroDrumDevice device={device} key={id} id={id} />
          || device.mpu6050 && <MPU6050Device device={device} key={id} id={id} />
          || device.worldTourDrum && <WorldTourDrumDevice device={device} key={id} id={id} />
        )}
      </SimpleGrid >
      <Affix position={{ bottom: 40, right: 40 }}>
        <Menu shadow="md" width={150}>
          <Menu.Target>
            <ActionIcon color="blue" radius="xl" size={60}>
              <IconPlus stroke={1.5} size={30} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconPlus size={14} />}>
              Add Device
            </Menu.Item>
            <Menu.Item leftSection={<IconTrash size={14} />}>
              Remove all devices
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Affix>
    </>
  );
}
