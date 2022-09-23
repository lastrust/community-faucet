import Link from "next/link";

export default function ERROR_505() {
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
                <h1>505 Server Error</h1><br></br><br></br>
                <code
                    style={{
                        fontSize: "1.3rem"
                    }}
                >Something unexpected seems to have happened
                    <br></br>
                    Please go back and try again...
                    <br></br><br></br>
                    &gt;&gt;<Link href="/">return to home</Link>
                </code>
            </main>
        </div>
    </>)
}