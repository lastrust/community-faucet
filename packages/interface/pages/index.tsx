import { Container, Grid } from "@nextui-org/react";
import type { NextPage } from 'next';
import Networks from 'src/components/networks';
const Home: NextPage = () => {
  return (
    <>
      <Container>
        <Grid.Container justify="center" >
          <Grid
            style={{
              margin: "10px auto"
            }}
          >
            <Networks
              name="astar"
              balance={629.87}
              total_drop={1164.92}
              supporter={197}
              symbol="ASTR"
              url="aster"
              color="#67b7f0"
            />
          </Grid>
          <Grid
            style={{
              margin: "10px auto"
            }}>
            <Networks
              name="shibuya"
              balance={1557.24}
              total_drop={606.80}
              supporter={69}
              symbol="SBY"
              url="shibuya"
              color="#7cd7de"
            />
          </Grid>
          <Grid
            style={{
              margin: "10px auto"
            }}>
            <Networks
              name="matic"
              balance={1.94}
              total_drop={29.38}
              supporter={30}
              symbol="MATIC"
              url="polygon"
              color="#a5bbe6"
            />
          </Grid>
          <Grid
            style={{
              margin: "10px auto"
            }}>
            <Networks
              name="shiden"
              balance={347.05}
              total_drop={1145.40}
              supporter={62}
              symbol="SDN"
              url="shiden"
              color="#f7bef2"
            />
          </Grid>
        </Grid.Container>
      </Container>
    </>
  )
}

export default Home
