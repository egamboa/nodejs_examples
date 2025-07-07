import Page from './Page';
import LinkTo from '../components/atoms/LinkTo';
import AuthForm from '../components/compounds/AuthForm';

export default function LoginPage() {

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
          <AuthForm />   
        </div>
      </div>
    </Page>
  );
}
