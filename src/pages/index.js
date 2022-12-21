import {Heading, Button, Grid } from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {useSession, signIn, signOut} from 'next-auth/react'

const Home = () => {
  const router = useRouter()
  const {data: session } = useSession()

  const signOutHdl = async() => {
    const data = await signOut({redirect: false, callbackUrl: '/'})
    router.push(data.url)
  }

  const signInHdl = async() => {
    router.push(`/auth/signIn?callbackUrl=${router.asPath}`)
  }

  return (
    <Grid placeItems='center' gridRowGap='1rem'>
      { session? 
        <>
          <Heading>signed in as {session.user.email}</Heading>
          <Button onClick={signOutHdl}>Sign out</Button>
        </>
      : (
        <>
          <Heading> not signed in</Heading>
          <Button onClick={signInHdl}>Sign in</Button>
        </>
      )}
    </Grid>
  )
}

export default Home