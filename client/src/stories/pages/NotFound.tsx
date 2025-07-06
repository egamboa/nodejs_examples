import Page from './Page';
import Button from '../components/atoms/Button';

export default function NotFound() {
  return (
    <Page>
      <div className="min-h-screen flex flex-col justify-center items-center text-white px-6">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6 text-indigo-200">Sorry, the page you are looking for does not exist.</p>
        <Button>
          Go Home
        </Button>
      </div>
    </Page>
  )
}
