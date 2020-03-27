import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from './axiosWithAuth'
import { FormControl, Stack, Heading, Input, Button } from '@chakra-ui/core'

const api = 'http://localhost:3000/api/auth/register'

function Signup(props) {
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }
  const [signupValues, setSignupValues] = useState(initialValues)
  const pageHistory = useHistory()

  const handleChange = e => {
    setSignupValues({
      ...signupValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios()
      .post(api, {
        first_name: signupValues.first_name,
        last_name: signupValues.last_name,
        email: signupValues.email,
        password: signupValues.password
      })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        pageHistory.push('/')
      })
      .catch(err => console.error(err))
      .finally(setSignupValues(initialValues))
  }

  return (
    <React.Fragment>
      <Stack
        spacing={3}
        w='30vw'
        border='2px solid grey'
        p={4}
        ml='35vw'
        mt='12vh'>
        <Heading fontFamily='JetBrains Mono' textAlign='center'>
          Sign Up
        </Heading>
        <form>
          <FormControl>
            <Stack spacing={5}>
              <Input
                type='text'
                placeholder='First Name'
                name='username'
                value={signupValues.username}
                onChange={handleChange}
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={signupValues.password}
                onChange={handleChange}
              />
              <Button
                variantColor='whatsapp'
                size='lg'
                tyep='submit'
                w='100%'
                onClick={handleSubmit}>
                Sign Up
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Stack>
    </React.Fragment>
  )
}

export default Signup
