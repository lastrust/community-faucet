import {
  ActionIcon,
  AppShell, Avatar, Burger, Button, Footer, Group, Header, MediaQuery, Navbar, Text, ThemeIcon, Title, UnstyledButton, useMantineTheme
} from '@mantine/core';
import { IconAlertCircle, IconDatabase, IconGitPullRequest, IconMessages, IconWallet } from '@tabler/icons';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useState } from 'react';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const data = [
    { icon: <Avatar src="/img/aster.png" alt="Aster" />, label: 'Aster' },
    { icon: <Avatar >SHI</Avatar>, label: 'Shibuya' },
    { icon: <Avatar src="/img/matic.png" alt="Matic" />, label: 'Matic' },
    { icon: <Avatar src="/img/shiden.png" alt="Shiden" />, label: 'Shiden' },
  ];
  interface MainLinkProps {
    icon: React.ReactNode;
    label: string;
  }

  function MainLink({ icon, label }: MainLinkProps) {
    return (
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ActionIcon radius="xl" size="xl">
            {icon}
          </ActionIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    );
  }
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          {data.map((link) => <MainLink {...link} key={link.label} />)}
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          &copy; 2022 Community Faucet
        </Footer>
      }
      header={
        <Header height={74} p="md">
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Group position="apart">
            <Link href="/">
              <Button
                variant="subtle"
                radius="md"
                size="md"
                color="dark"
              >
                <Title order={2}
                  weight={500}
                >Community Faucet</Title>
              </Button>
            </Link>
            <Button variant="default" leftIcon={<IconWallet />} onClick={() => { }} >
              Connect Wallet
            </Button>
          </Group>
        </Header>
      }
    >
      <Component {...pageProps} />
    </AppShell>
  );
}

export default MyApp
