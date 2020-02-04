import { Schedule } from '../../interfaces/Schedule';
import Card from '../../../commons/components/Card';

interface Props {
  schedule: Schedule;
}

const Staff: React.FC<Props> = ({ schedule }) => {
  return (
    <Card className='m-4 flex flex-col p-8'>
      <img
        className='w-32 h-32 rounded-full self-center mb-8'
        src='https://javascriptbangkok.com/speaker-images/04.jpg'
        alt='Italian Trulli'
      />
      <div className='text-center'>
        <p className='text-xl font-bold text-bkk-speaker'>Rajasegar Chandran</p>
        <p className='text-xl font-bold text-bkk-position mb-16'>
          Front-end Developer @ Freshworks Inc.
        </p>
        <h3 className='text-3xl font-bold mb-3 mt-6'>
          The Art of Crafting Codemods
        </h3>
      </div>
      <p>
        Codemod is a mechanism to make sweeping changes across your code with
        ease and effectiveness, assisting in large-scale migrations of the
        code-base. This can be performed through automated tools such as
        jscodeshift.
      </p>
      <h3 className='text-2xl font-bold text-bkk-aboutHeader mb-3 mt-6'>
        About The Speaker
      </h3>
      <p>
        Rajasegar works with Freshworks as a front-end developer. He is
        passionate about open-source software and currently writes codemods for
        the Ember community.
      </p>
      <h3 className='text-2xl font-bold text-bkk-aboutHeader mb-3 mt-6'>
        Contact
      </h3>
      <p>Website: http://hangaroundtheweb.com/</p>
      <p>Email: rajasegar.c@gmail.com</p>
    </Card>
  );
};

export default Staff;
