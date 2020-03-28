import React, { useState } from 'react'
import { useHistory, Link as RRLink } from 'react-router-dom'
import axios from './axiosWithAuth'
import { FormControl, Stack, Heading, Input, Link, Button } from '@chakra-ui/core'

const api = 'http://localhost:3300/api/auth/register'

function Signup() {
  const initialValues = {
    username: '',
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
        username: signupValues.username,
        password: signupValues.password
      })
      .then(res => {
        console.log(res.data)
        pageHistory.push('/login')
      })
      .catch(err => console.error(err))
      .finally(setSignupValues(initialValues))
  }

  return (
    <React.Fragment>
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
          Sign Up
        </Heading>
        <form>
          <FormControl>
            <Stack spacing={5}>
              <Input
                type='text'
                placeholder='Username'
                name='username'
                value={signupValues.username}
                onChange={handleChange}
                variant='flushed'
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={signupValues.password}
                onChange={handleChange}
                variant='flushed'
              />
              <Button
                variantColor='facebook'
                size='lg'
                tyep='submit'
                w='100%'
                onClick={handleSubmit}>
                Sign Up
              </Button>

              <Link
                as={RRLink}
                to='/login'
                fontFamily='Kurale'
                fontWeight='bold'
                fontSize='18px'
                textAlign='center'
                color="green.600"
                >
                Already registered? Log In →
              </Link>
            </Stack>
          </FormControl>
        </form>
      </Stack>
    </React.Fragment>
  )
}

export default Signup
