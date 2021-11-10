import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Image,
  HStack,
  Input
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { ChainId, DAppProvider, useEtherBalance, useEthers, useContractFunction } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'

const abi = require('./abi/Exobot.json').abi

const wethInterface = new utils.Interface(abi)
const wethContractAddress = '0x53B1147F3bf6B66D554Afe86Ab677cC396Ec6805'
const contract = new Contract(wethContractAddress, wethInterface)

const ShortAddress = (address) => {
  const start = address.slice(0,4);
  const end = address.slice(address.length - 5, address.length)
  return `${start}...${end}`;
}

export const App = () => {
  const [quantity, setQuantity] = React.useState({})
  const { activateBrowserWallet, account } = useEthers()
  const { state, send } = useContractFunction(contract, 'mintRobot')

  const mint = () => {
    send(1, { value: utils.parseEther("0.05") })
  }

  const handleQtyChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value)
  }

  return (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3} backgroundColor='black'>
        <VStack spacing={8}>
        <Image src="logo.jpeg"/>
          {!account && <Button onClick={() => activateBrowserWallet()}>Connect Wallet</Button>}
          { account && <Text color='white'>Your Wallet: {ShortAddress(account)}</Text>}
          { account && <HStack><Input type='number' placeholder="Quantity" textColor='white'/><Button onClick={mint}>Mint</Button></HStack>}
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
  )
}
