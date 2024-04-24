import { titleFont } from '@/config/fonts';

import { SignupForm } from './ui';

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Sign up</h1>

      <SignupForm />
    </div>
  );
}