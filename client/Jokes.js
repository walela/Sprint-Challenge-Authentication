import React, { useState, useEffect } from 'react'
import axios from './axiosWithAuth'
import { Grid, Box } from '@chakra-ui/core'

export default function Jokes() {
  const api = 'http://localhost:3300/api/jokes'
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios()
      .get(api)
      .then(res => setJokes(res.data))
      .catch(err => console.error(err))
  }, [jokes])

  return (
    <React.Fragment>
      <Grid templateColumns='repeat(1, 1fr)' gap={3}>
        <Box w='100%' h='10' bg='blue.200' />
        {jokes.map(joke => (
          <Box key={joke.id} w='100%' h='12' bg='blue.200'>
            {joke.joke}
          </Box>
        ))}
      </Grid>
    </React.Fragment>
  )
}
