import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { withRequiredAuthentication } from '../../../../components/authentication';
import Card from '../../../../commons/components/Card';
import Button from '../../../../commons/components/Button';
import { updateBio } from '../../../../commons/hooks/networkingHooks';

const EditBio: React.FC = () => {
  const [bio, setBio] = useState<string>('');
  const router = useRouter();

  const submitForm = useCallback(
    async e => {
      e.preventDefault();
      await updateBio(bio);
      router.push('/user/networking/my-badge');
    },
    [bio]
  );

  return (
    <div className='flex w-screen'>
      <Card className='w-screen m-4 self-center text-center'>
        <h1 className='text-lg font-bold text-black my-2'>Editing your bio</h1>
        <form onSubmit={submitForm}>
          <div className='flex flex-row items-center'>
            <h3 className='mr-4 text-lg text-black self-start'>Bio:</h3>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              className='border-gray-500 border-solid border w-full rounded p-2'
            />
          </div>
          <Button
            type='submit'
            className='bg-yellow-dark rounded px-4 py-1 m-4 text-lg'
          >
            Edit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default withRequiredAuthentication(EditBio);
