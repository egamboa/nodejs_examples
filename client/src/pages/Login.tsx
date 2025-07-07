import Page from './Page';
import LinkTo from '../components/atoms/LinkTo';
import AuthForm from '../components/compounds/AuthForm';
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {

  const { login } = useAuth()
  const navigate = useNavigate()


  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password)
      navigate('/welcome')
    } catch (err) {
      console.log('Failed to login', err)
    }
  }

  return (
    <Page>
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Login to <span className="text-yellow-300"><LinkTo to={'/'}>Pokémon Finder</LinkTo></span>
          </h1>
          <p className="mt-2 text-indigo-200">Welcome back, trainer!</p>
        </div>

        <div className='max-w-md mx-auto'>
          <AuthForm onSubmit={handleSubmit} />   
        </div>
      </div>
    </Page>
  );
}
