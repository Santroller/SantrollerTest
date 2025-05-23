import { AppShell, Burger, Group, Skeleton, Badge, NavLink, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Layout.module.css';
import { NavLink as RouterLink } from "react-router-dom"
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconSettings, IconDeviceGamepad3 } from '@tabler/icons-react';
import { useState, useReducer } from 'react';

export function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Image
              src="Icons/logoSide.png"
              height={40}
              fit="scale-down"
              alt="Norway"
            />
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink
            component={RouterLink}
            to="/"
            label="Settings"
            leftSection={<IconSettings size={16} stroke={1.5} />}
          />
          <NavLink
            component={RouterLink}
            to="/devices"
            label="Devices"
            leftSection={<IconSettings size={16} stroke={1.5} />}
          />
          <NavLink
            component={RouterLink}
            to="/profiles"
            label="Profiles"
            leftSection={<IconDeviceGamepad3 size={16} stroke={1.5} />}
          />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}
