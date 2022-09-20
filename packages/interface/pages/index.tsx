import { Grid } from "@nextui-org/react";
import type { NextPage } from 'next';
import Networks from 'src/components/networks';
const Home: NextPage = () => {
  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs={6}>
          <Networks
            name="Astar"
            balance={629.87}
            total_drop={1164.92}
            supporter={197}
            symbol="ASTR"
          />
        </Grid>
        <Grid xs={6}>
          <Networks
            name="Shibuya"
            balance={1557.24}
            total_drop={606.80}
            supporter={69}
            symbol="SBY"
          />
        </Grid>
        <Grid xs={6}>
          <Networks
            name="Matic"
            balance={1.94}
            total_drop={29.38}
            supporter={30}
            symbol="MATIC"
          />
        </Grid>
        <Grid xs={6}>
          <Networks
            name="Shiden"
            balance={347.05}
            total_drop={1145.40}
            supporter={62}
            symbol="SDN"
          />
        </Grid>
      </Grid.Container>
    </>
  )
}

export default Home
