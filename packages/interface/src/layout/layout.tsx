import { ReactNode } from "react";
import { Navbar, Link, Text, Button, Container } from "@nextui-org/react";
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
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
                css={{
                    "@xs": {
                        w: "12%",
                    },
                }}
            >
                <Link
                    href="/"
                    color="text"
                >
                    <Text b color="inherit" hideIn="xs">
                        Community Faucet
                    </Text>
                </Link>
            </Navbar.Brand>
            <Navbar.Content
                variant="highlight"
            >
                <Navbar.Link isActive={router.pathname == "/"} href="/">Home</Navbar.Link>
                <Navbar.Link isActive={router.pathname == "/supporters"} href="/supporters">Supporters</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="#">
                    <Button
                        auto
                        light
                        color="gradient"
                        onClick={() => { setTheme(isDark ? "light" : "dark") }}
                        icon={isDark ? <MoonIcon width={20} /> : <SunIcon width={20} />}
                    />
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="#">
                        Connect Wallet
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
        <Container>
            {children}
        </Container>
    </>)
}