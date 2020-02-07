import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { withRequiredAuthentication } from '../../../../components/authentication';
import Card from '../../../../commons/components/Card';
import Button from '../../../../commons/components/Button';
import {
  createNetworkingProfile,
  updateBio
} from '../../../../commons/hooks/networkingHooks';

const Welcome: React.FC = observer(() => {
  const [bio, setBio] = useState<string>('');
  const router = useRouter();
  const submitForm = useCallback(
    async e => {
      e.preventDefault();
      await createNetworkingProfile();
      await updateBio(bio);
      router.push('/user/networking/my-badge');
    },
    [bio]
  );

  return (
    <div className='flex w-screen'>
      <Card className='w-screen m-4 self-center text-center'>
        <h1 className='text-lg font-bold text-black my-2'>
          Welcome to Networking
        </h1>
        <p className='mb-4 text-gray-600'>
          The goal of networking is to offer a chance for you to meet new people
          whom you never met before.
        </p>
        <h2 className='text-lg font-semibold text-black mb-4'>
          Please enter your details :
        </h2>
        <form onSubmit={submitForm} className='flex flex-row items-center'>
          <h3 className='mr-4 text-lg text-black self-start'>Bio:</h3>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className='border-gray-500 border-solid border w-full rounded p-2'
          />
          <Button
            type='submit'
            className='bg-yellow-dark rounded px-4 py-1 m-4 text-lg'
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
});

export default withRequiredAuthentication(Welcome);
