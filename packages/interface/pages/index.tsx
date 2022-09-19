import type { NextPage } from 'next'
import { Container, Grid } from '@mantine/core';
import Top_networks from 'src/components/top_networks';
const Home: NextPage = () => {
  return (
    <>
      <Container >
        <Grid grow gutter="lg">
          <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Top_networks
              name="aster"
              balance={630.06}
              total_drop={1164.73}
              supporter={197}
              symbol="ASTR"
              color="indigo"
              grow={false}
            /></Grid.Col>
          <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}><Top_networks
            name="shibuya"
            balance={1557.24}
            total_drop={606.80}
            supporter={69}
            symbol="SBY"
            color="gray"
            grow={false}
          /></Grid.Col>
          <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}><Top_networks
            name="matic"
            balance={1.94}
            total_drop={29.38}
            supporter={30}
            symbol="MATIC"
            color="grape"
            grow={false}
          /></Grid.Col>
          <Grid.Col xs={12} sm={12} md={12} lg={6} xl={6}><Top_networks
            name="shiden"
            balance={347.07}
            total_drop={1145.38}
            supporter={62}
            symbol="SDN"
            color="cyan"
            grow={false}
          /></Grid.Col>

        </Grid>
      </Container>
    </>
  )
}

export default Home
