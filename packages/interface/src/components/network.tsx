import { Button, Card, Collapse, Grid, Text } from "@nextui-org/react";
export default function Network({ name, balance, total_drop, supporter, symbol }: { name: string, balance: number, total_drop: number, supporter: number, symbol: string }) {
    var capitalize = function (str: string) {
        if (typeof str !== 'string' || !str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    return (
        <>
            <Text
                h1
                size={60}
                css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    textAlign: "center",
                    marginTop: "2rem",
                    lineHeight: "70px",
                    marginBottom: "20px"
                }}
                weight="bold"
            >
                {capitalize(name)} Community Faucet
            </Text>
            <Grid.Container gap={2} justify="center"
                css={{
                    "@xsMax": {
                        display: "none !important"
                    },
                    "@xsMin": {
                        display: "box"
                    }
                }}>
                <Grid>
                    <Button color="primary" size="lg">
                        Get {symbol.length == 3 ? symbol + "　" : symbol}
                    </Button>
                </Grid>
                <Grid>
                    <p style={{ lineHeight: "40px" }}>OR</p>
                </Grid>
                <Grid>
                    <Button shadow bordered color="gradient" size="lg">
                        Support Faucet
                    </Button>
                </Grid>
            </Grid.Container>
            <Grid.Container gap={2} justify="center"
                css={{
                    "@xsMax": {
                        display: "box"
                    },
                    "@xsMin": {
                        display: "none"
                    }
                }}>
                <Grid justify="center">
                    <Button color="primary" size="lg">
                        Get {symbol.length == 3 ? symbol + "　" : symbol}
                    </Button>
                </Grid>
                <Grid xs={12} sm={4} md={4} lg={4} xl={4} justify="center" style={{
                    margin: "-15px auto"
                }}>
                    <p style={{ lineHeight: "40px" }}>OR</p>
                </Grid>
                <Grid justify="center">
                    <Button shadow bordered color="gradient" size="lg">
                        Support Faucet
                    </Button>
                </Grid>
            </Grid.Container>
            <Grid.Container justify="center" style={{
                marginTop: "3rem"
            }}>
                <Grid xs={6} sm={4} md={4} lg={4} xl={4}
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
                    }}>{balance} {symbol.length == 3 ? symbol + "　" : symbol}</Text>
                    <Text h5 color="#7d8185">Remaining funds</Text>
                </Grid>
                <Grid xs={6} sm={4} md={4} lg={4} xl={4}
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
                    }}>{total_drop} {symbol.length == 3 ? symbol + "　" : symbol}</Text>
                    <Text h5 color="#7d8185">{symbol} from here</Text>
                </Grid>
                <Grid xs={6} sm={4} md={4} lg={4} xl={4}
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
        </>
    )
}