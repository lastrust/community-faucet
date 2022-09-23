import Link from "next/link";
import { Text } from "@nextui-org/react";
export default function Error_Page({ statusCode }: { statusCode: number }) {
    if (statusCode !== 418) {
        return (<>
            <div style={{
                padding: "0 2rem",
            }}>
                <main style={{
                    minHeight: "80vh",
                    padding: "4rem 0",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <h1>Error : {statusCode}</h1><br></br><br></br>
                    <code
                        style={{
                            fontSize: "1.3rem"
                        }}
                    >An unexpected error has occurred
                        <br></br><br></br>
                        &gt;&gt;<Link href="/">return to home</Link>
                    </code>
                </main>
            </div>
        </>)
    } else {
        return (<>
            <div style={{
                padding: "0 2rem",
            }}>
                <main style={{
                    minHeight: "80vh",
                    padding: "4rem 0",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text
                        h1
                        size={60}
                        css={{
                            textGradient: "45deg, $blue600 -20%, $pink600 50%",
                        }}
                        weight="bold"
                    >
                        418
                    </Text>
                    <Text
                        h1
                        size={60}
                        css={{
                            textGradient: "45deg, $purple600 -20%, $pink600 100%",
                        }}
                        weight="bold"
                    >
                        I&apos;m
                    </Text>
                    <Text
                        h1
                        size={60}
                        css={{
                            textGradient: "45deg, $yellow600 -20%, $red600 100%",
                        }}
                        weight="bold"
                    >
                        a teapot
                    </Text>
                </main>
            </div>
        </>)
    }
}