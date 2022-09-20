import { Container, Card, Grid, Text, Link } from "@nextui-org/react";
export default function Networks({ name, balance, total_drop, supporter, symbol }: { name: string, balance: number, total_drop: number, supporter: number, symbol: string }) {
    var capitalize = function (str: string) {
        if (typeof str !== 'string' || !str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    return (
        <Container>
            <Card css={{ p: "$6", mw: "400px" }}>
                <Card.Header>
                    <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                            <Text h4 css={{ lineHeight: "$xs" }}>
                                {capitalize(name)} Community Faucet
                            </Text>
                        </Grid>
                    </Grid.Container>
                </Card.Header>
                <Card.Body css={{ py: "$2" }}>
                    <Grid.Container css={{ pl: "$6" }} justify="center">
                        <Grid xs={6}
                            style={{
                                display: "block",
                                textAlign: "center",
                                margin: "5px auto"
                            }}
                        >
                            <Text h5 color="#565c61">Faucet Balance</Text>
                            <Text h3 style={{
                                marginTop: "-6px",
                                marginBottom: "1px"
                            }}>{balance} {symbol}</Text>
                            <Text h5 color="#7d8185">Remaining funds</Text>
                        </Grid>
                        <Grid xs={6}
                            style={{
                                display: "block",
                                textAlign: "center",
                                margin: "5px auto"
                            }}
                        >
                            <Text h5 color="#565c61">Total Drop</Text>
                            <Text h3 style={{
                                marginTop: "-6px",
                                marginBottom: "1px"
                            }}>{total_drop} {symbol}</Text>
                            <Text h5 color="#7d8185">{symbol} from here</Text>
                        </Grid>
                        <Grid xs={6}
                            style={{
                                display: "block",
                                textAlign: "center",
                                margin: "5px auto"
                            }}
                        >
                            <Text h5 color="#565c61">Supporter</Text>
                            <Text h3 style={{
                                marginTop: "-6px",
                                marginBottom: "1px"
                            }}>{supporter}</Text>
                            <Text h5 color="#7d8185">Faucet Supporter</Text>
                        </Grid>
                    </Grid.Container>
                </Card.Body>
                <Card.Footer>
                    <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}
                            style={{
                                display: "block",
                                textAlign: "center"
                            }}
                        >

                            <Link
                                color="primary"
                                target="_blank"
                                href="https://github.com/nextui-org/nextui"
                            >
                                Open Aster Acquisition Page
                            </Link>

                        </Grid>
                    </Grid.Container>
                </Card.Footer>
            </Card>
        </Container>
    )
}