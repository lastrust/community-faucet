import { Component, ReactNode } from "react";
import {
    ActionIcon,
    AppShell, Avatar, Burger, Button, Footer, Group, Header, MediaQuery, Navbar, Text, ThemeIcon, Title, UnstyledButton, useMantineTheme
} from '@mantine/core';
import { IconAlertCircle, IconDatabase, IconGitPullRequest, IconMessages, IconWallet } from '@tabler/icons';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useState } from 'react';
import header_styles from "styles/Header.module.css"
export default function App_nav({ children }: { children: ReactNode }) {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
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
                    {icon}
                    <Text size="sm">{label}</Text>
                </Group>
            </UnstyledButton>
        );
    }
    return (
        <>
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
                    <Header height={70} p="md">
                        <Group position="apart">
                            <Link href="/">
                                <UnstyledButton>
                                    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                                        <Title order={2}
                                            weight={500}
                                        >Community Faucet</Title>
                                    </MediaQuery>
                                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                        <Title order={2}
                                            weight={500}
                                        >CFaucet</Title>
                                    </MediaQuery>
                                </UnstyledButton>
                            </Link>
                            <MediaQuery smallerThan={305} styles={{ display: 'none' }}>
                                <Button variant="default" leftIcon={<IconWallet />} onClick={() => { }} >
                                    Connect Wallet
                                </Button>
                            </MediaQuery>
                            <MediaQuery largerThan={305} styles={{ display: 'none' }}>
                                <Button variant="default" onClick={() => { }} >Connect Wallet
                                </Button>
                            </MediaQuery>
                        </Group>
                    </Header>
                }
            >
                {children}
            </AppShell>
        </>
    );
}