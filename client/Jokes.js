import React, { useState, useEffect } from 'react'
import axios from './axiosWithAuth'
import { useHistory } from 'react-router-dom'
import { Grid, Box, Flex, Heading, Button } from '@chakra-ui/core'

export default function Jokes() {
  const api = 'http://localhost:3300/api/jokes'
  const [jokes, setJokes] = useState([])

  const pageHistory = useHistory()

  useEffect(() => {
    axios()
      .get(api)
      .then(res => setJokes(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleSignout = () => {
    localStorage.removeItem('token')
    pageHistory.push('/login')
  }

  return (
    <React.Fragment>
      <Grid w='960px' margin='0 auto' templateColumns='repeat(1, 1fr)' gap={3}>
        <Flex w='100%' h='16' bg='gray.200' justify='space-between' p='12px'>
          <Heading fontFamily='Domine'>Dad Jokes</Heading>
          <Button variantColor='facebook' onClick={handleSignout}>
            {' '}
            Sign Out
          </Button>
        </Flex>
        {jokes.map(joke => (
          <Box
            key={joke.id}
            w='100%'
            fontFamily='Domine'
            fontWeight='bold'
            h='12'
            boxShadow='1px 1px 2px grey'
            bg='blue.200'
            borderRadius='2px'
            textAlign='center'
            p='2'>
            {joke.joke}
          </Box>
        ))}
      </Grid>
    </React.Fragment>
  )
}
