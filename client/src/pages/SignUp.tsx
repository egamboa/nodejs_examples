import Page from './Page';
import RegisterForm from '../components/compounds/RegisterForm';
import LinkTo from '../components/atoms/LinkTo';


export default function SignUp() {

  return (
    <Page>
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Join <span className="text-yellow-300"><LinkTo to={'/'}>Pokémon Finder</LinkTo></span>
          </h1>
          <p className="mt-2 text-indigo-200">Start your Pokémon journey today!</p>
        </div>
        <div className='max-w-md mx-auto'>
          <RegisterForm  />
        </div>
      </div>
    </Page>
  );
}
