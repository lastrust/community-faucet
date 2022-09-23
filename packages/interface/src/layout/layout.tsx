import { ReactNode } from "react";
import { Navbar, Text, Button, Container } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();
    return (<>
        <Navbar shouldHideOnScroll variant="floating" isBordered>
            <Navbar.Brand
                css={{
                    "@xs": {
                        w: "12%",
                    },
                }}
            >
                <Link
                    href="/"
                >
                    <Text b color="inherit" hideIn="sm"
                        style={{
                            cursor: "pointer"
                        }}>
                        Community Faucet
                    </Text>
                </Link>
                <Link
                    href="/"
                >
                    <Text b color="inherit" showIn="sm" style={{
                        marginBottom: "2px",
                        cursor: "pointer"
                    }}>
                        CFaucet
                    </Text>
                </Link>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Link color="inherit" hideIn="sm">
                    <Button
                        auto
                        light
                        color="gradient"
                        onClick={() => { setTheme(isDark ? "light" : "dark") }}
                        icon={isDark ? <MoonIcon width={20} color="#FFFFFF" /> : <SunIcon width={20} color="#000000" />}
                    />
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat>
                        Connect Wallet
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
        {children}
    </>)
}