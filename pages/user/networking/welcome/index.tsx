import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../../../../interfaces/Commons';
import rootContext from '../../../../commons/context.root';
import { withRequiredAuthentication } from '../../../../components/authentication';
import Card from '../../../../commons/components/Card';

const Welcome: React.FC = observer(() => {
  // const { userStore } = useContext<RootStore>(rootContext);

  return (
    <div className='flex w-screen'>
      <Card className='w-screen m-4 self-center text-center'>
        <h1 className='text-2xl font-bold text-bkk-position mt-2 mb-2'>
          Welcome to Networking
        </h1>
        <p className="mb-4">
          The goal of networking is to offer a chance for you to meet new people
          whom you never met before.
        </p>
        <h2 className='text-xl font-semibold text-bkk-speaker mb-2'>
          Please enter your details
        </h2>
        <form className='flex flex-row items-center'>
          <h3 className='mr-4 text-lg font-semibold text-bkk-aboutHeader'>Bio:</h3>
          <textarea
            className='border-gray-500 border-solid border w-full rounded p-2'
            // rows={3}
          >
            ds
          </textarea>
        </form>
      </Card>
    </div>
  );
});

export default withRequiredAuthentication(Welcome);
