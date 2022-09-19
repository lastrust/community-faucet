import { Card, Image, Text, Badge, Button, Group, Blockquote, Grid } from '@mantine/core';
import { IconArrowsExchange2 } from '@tabler/icons';

export default function Top_networks({ name, balance, total_drop, supporter, symbol, color, grow }: { name: string, balance: number, total_drop: number, supporter: number, symbol: string, color: string, grow: boolean }) {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
                <Text weight={500} size={20}
                    style={{
                        textTransform: "capitalize",
                    }}
                >{name} Community Faucet</Text>
            </Group>
            <Grid grow={grow}>
                <Grid.Col xs={6} sm={4} md={4} lg={6} xl={6}>
                    <Text size="sm" color="dimmed" align="center">
                        <Blockquote
                            cite="– Remaining funds"
                            icon={null}
                        >
                            <span style={{
                                color: "gray"
                            }}>Faucet Balance</span> <br></br>
                            <h3 style={{
                                marginTop: "1px",
                                marginBottom: "-10px"
                            }}>{balance} {symbol}</h3>
                        </Blockquote>
                    </Text>
                </Grid.Col>
                <Grid.Col xs={6} sm={4} md={4} lg={6} xl={6}>
                    <Text size="sm" color="dimmed" align="center">
                        <Blockquote
                            cite={"–" + symbol + " from here"}
                            icon={null}
                        >
                            <span style={{
                                color: "gray"
                            }}>Total Drop</span> <br></br>
                            <h3 style={{
                                marginTop: "1px",
                                marginBottom: "-10px"
                            }}>{total_drop} {symbol}</h3>
                        </Blockquote>
                    </Text>
                </Grid.Col>
                <Grid.Col xs={6} sm={4} md={4} lg={6} xl={6}>
                    <Text size="sm" color="dimmed" align="center">
                        <Blockquote
                            cite="– Faucet Supporter"
                            icon={null}
                        >
                            <span style={{
                                color: "gray"
                            }}>Supporter</span> <br></br>
                            <h3 style={{
                                marginTop: "1px",
                                marginBottom: "-10px"
                            }}>{supporter} {symbol}</h3>
                        </Blockquote>
                    </Text>
                </Grid.Col>
            </Grid>
            <Button color={color} fullWidth mt="md" radius="md">
                Open {name} Acquisition Page
            </Button>
        </Card>
    );
}