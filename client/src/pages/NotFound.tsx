import Page from './Page';
import LinkTo from '../components/atoms/LinkTo';

export default function NotFound() {
  return (
    <Page>
      <div className="flex flex-col justify-center items-center text-white px-6 mt-64">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6 text-indigo-200">Sorry, the page you are looking for does not exist.</p>
        <LinkTo to="/sign-up" asButton buttonClassName="w-full sm:w-auto">
          Sign Up
        </LinkTo>
      </div>
    </Page>
  )
}
