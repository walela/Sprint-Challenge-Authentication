import React, { useState } from 'react'
import { Link as RRLink, useHistory } from 'react-router-dom'
import axios from './axiosWithAuth'
import {
  FormControl,
  Heading,
  Stack,
  Input,
  Link,
  Button
} from '@chakra-ui/core'

export default function Login() {
  const initialValues = {
    username: '',
    password: ''
  }
  const [loginValues, setLoginValues] = useState(initialValues)
  const pageHistory = useHistory()

  const handleChange = e => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios()
      .post('http://localhost:3300/api/auth/login', {
        username: loginValues.username,
        password: loginValues.password
      })
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.token)
        pageHistory.push('/jokes')
      })
      .catch(err => console.error(err))
  }

  return (
    <Stack
      spacing={3}
      w='30vw'
      px={6}
      pt={6}
      pb={72}
      ml='35vw'
      mt='12vh'
      boxShadow='-2px 1px 5px grey, 1px -1px 5px grey'>
      <Heading fontFamily='Domine' textAlign='center'>
        Login
      </Heading>
      <form>
        <FormControl>
          <Stack spacing={5}>
            <Input
              placeholder='Username'
              name='username'
              value={loginValues.username}
              onChange={handleChange}
              variant='flushed'
            />
            <Input
              type='password'
              placeholder='Password'
              name='password'
              value={loginValues.password}
              onChange={handleChange}
              variant='flushed'
            />
            <Button
              size='lg'
              variantColor='facebook'
              type='submit'
              w='100%'
              onClick={handleSubmit}>
              Login
            </Button>
            <Link
              as={RRLink}
              to='/'
              fontFamily='Kurale'
              fontWeight='bold'
              fontSize='18px'
              textAlign='center'
              variantColor='linkedin'>
              New User? Sign Up →
            </Link>
          </Stack>
        </FormControl>
      </form>
    </Stack>
  )
}
