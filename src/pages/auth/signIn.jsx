import {useState} from 'react'
import {useRouter} from 'next/router'
import {
    Box,
    Button,
    Grid,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    chakra
} from '@chakra-ui/react'
import { useSession, signIn, signOut} from 'next-auth/react'
import { BsGithub, BsTwitter, BsGoogle } from 'react-icons/bs'
const providers = [
    {
        name: 'github',
        Icon: BsGithub,
    },
    {
        name: 'twitter',
        Icon: BsTwitter,
    },
    {
        name: 'google',
        Icon: BsGoogle,
    },
]


const Signin = () => {
    const [em, setEm] = useState();
    const {data: session, status} = useSession();
    const {push} = useRouter();
    if (status === 'loading') { return <Heading>Checking Authenti...</Heading> }
    if (session) {
        setTimeout( () => {
            push('/')
        }, 5000)
        return <Heading>you are alrdy signedIn...</Heading>
    }
    const OAuthSignInHdl = (providern) => () => signIn(providern)
    const submHdl = (e) => {
        e.preventDefault()
        if (!em) return false;
        signIn('email', {em, redirect: false})
    }
    return (
        <Box>
            <chakra.form onSubmit={submHdl}>
                <FormLabel>Email Address</FormLabel>
                <Input value={em} type='email' onChange={e => setEm(e.target.value)} />

                <Button type='submit' w='100%' my={5}>Login</Button>
            </chakra.form>
            <VStack>
                {providers.map(({name, Icon})=> (
                    <Button
                        key={name}
                        leftIcon={<Icon/>}
                        onClick={OAuthSignInHdl(name)}
                        textTransform='uppercase'
                        w='100%'
                    >
                        Sign In with {name}
                    </Button>
                ))}
            </VStack>
        </Box>
    )
}

export default Signin