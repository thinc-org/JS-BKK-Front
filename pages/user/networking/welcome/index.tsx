import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../../../../interfaces/Commons';
import rootContext from '../../../../commons/context.root';
import { withRequiredAuthentication } from '../../../../components/authentication';
import Card from '../../../../commons/components/Card';
import Button from '../../../../commons/components/Button';

const Welcome: React.FC = observer(() => {
  // const { userStore } = useContext<RootStore>(rootContext);

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
        <form className='flex flex-row items-center'>
          <h3 className='mr-4 text-lg text-black self-start'>Bio:</h3>
          <textarea
            className='border-gray-500 border-solid border w-full rounded p-2'
            // rows={3}
          >
            ds
          </textarea>
        </form>
        <Button
          type='button'
          className='bg-yellow-dark rounded px-4 py-1 m-4 text-lg'
          // onClick={}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
});

export default withRequiredAuthentication(Welcome);
