import { Container, Card, Grid, Text, Button } from "@nextui-org/react";
import Link from "next/link";
export default function Networks({ name, balance, total_drop, supporter, symbol, url, color }: { name: string, balance: number, total_drop: number, supporter: number, symbol: string, url: string, color: string }) {
    var capitalize = function (str: string) {
        if (typeof str !== 'string' || !str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    function hex2rgba(hex: string, alpha = 1) {
        let r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
        let c = null
        if (r) {
            c = r.slice(1, 4).map(function (x) { return parseInt(x, 16) })
        }
        r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
        if (r) {
            c = r.slice(1, 4).map(function (x) { return 0x11 * parseInt(x, 16) })
        }
        if (!c) {
            return null
        }
        return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`
    }
    return (
        <Card css={{ p: "$6", mw: "400px" }}
        >
            <Card.Header>
                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text h2 css={{ lineHeight: "$xs", marginBottom: "-3px" }}>
                            {capitalize(name)}
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
                <Grid.Container justify="center">
                    <Grid xs={12} sm={6} md={6} lg={6} xl={6}
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
                    <Grid xs={12} sm={6} md={6} lg={6} xl={6}
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
                    <Grid xs={12} sm={6} md={6} lg={6} xl={6}
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
                            href={"/" + url}
                        >
                            <Button
                                style={{
                                    width: "100%",
                                }}
                                bordered
                                color="gradient"
                            >Open {symbol} Acquisition Page</Button>
                        </Link>

                    </Grid>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}