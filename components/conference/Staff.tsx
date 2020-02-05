import sanitizeHTML from 'sanitize-html';
import { useMemo } from 'react';
import { Schedule } from '../../interfaces/Schedule';
import Card from '../../commons/components/Card';

interface Props {
  schedule: Schedule;
}

const Staff: React.FC<Props> = ({ schedule }) => {
  const description = useMemo(() => {
    return (
      schedule.description && (
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(schedule.description)
          }}
        />
      )
    );
  }, [schedule.description]);

  const about = useMemo(() => {
    return (
      schedule.about && (
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(schedule.about)
          }}
        />
      )
    );
  }, [schedule.description]);

  return (
    <Card className='m-4 flex flex-col p-8'>
      <img
        className='w-32 h-32 rounded-full self-center mb-8'
        src={schedule.image}
        alt='Italian Trulli'
      />
      <div className='text-center'>
        <p className='text-xl font-bold text-bkk-speaker'>{schedule.speaker}</p>
        <p className='text-xl font-bold text-bkk-position mb-16'>
          {schedule.position}
        </p>
        <h3 className='text-3xl font-bold mb-3 mt-6'>{schedule.title}</h3>
      </div>
      {description}
      <h3 className='text-2xl font-bold text-bkk-aboutHeader mb-3 mt-6'>
        About The Speaker
      </h3>
      {about}
      {schedule.url && schedule.email && (
        <>
          <h3 className='text-2xl font-bold text-bkk-aboutHeader mb-3 mt-6'>
            Contact
          </h3>
          {schedule.url && (
            <p>
              Website: <a href={schedule.url}>{schedule.url}</a>
            </p>
          )}
          {schedule.email && <p>Email: {schedule.email}</p>}
        </>
      )}
    </Card>
  );
};

export default Staff;
