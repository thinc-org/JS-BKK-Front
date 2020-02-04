import sanitizeHTML from 'sanitize-html';
import { useMemo } from 'react';
import { Schedule } from '../../interfaces/Schedule';
import { ModalStore } from '../../commons/stores/authModalStores';
import Modal from '../../commons/components/Modal';

interface Props {
  schedule?: Schedule;
  modalStore: ModalStore;
}

const Staff: React.FC<Props> = ({ schedule, modalStore }) => {
  const description = useMemo(() => {
    return (
      schedule?.description && (
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(schedule.description)
          }}
        />
      )
    );
  }, [schedule?.description]);

  const about = useMemo(() => {
    return (
      schedule?.about && (
        <p
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(schedule.about)
          }}
        />
      )
    );
  }, [schedule?.description]);

  return (
    <Modal
      modalStore={modalStore}
      className='bg-dim top-0 p-6 min-h-500px z-50'
      data-testid='food-customization-modal'
      aria-label='Customize your meal'
    >
      {!modalStore.isHidden && (
        <>
          <img
            className='w-32 h-32 rounded-full mb-8'
            src={schedule?.image}
            alt='Italian Trulli'
          />
          <div className='text-center'>
            <p className='text-lg font-bold text-bkk-speaker'>
              {schedule?.speaker}
            </p>
            <p className='text-lg font-bold text-bkk-position'>
              {schedule?.position}
            </p>
            <h3 className='text-lg font-bold mb-3 mt-6'>{schedule?.title}</h3>
          </div>
          {description}
          <h3 className='text-xl text-left font-bold text-bkk-aboutHeader mb-3 mt-6'>
            About The Speaker
          </h3>
          {about}
          {schedule?.url && schedule.email && (
            <>
              <h3 className='text-xl text-left font-bold text-bkk-aboutHeader mb-3 mt-6'>
                Contact
              </h3>
              {schedule.url && (
                <p>
                  Website: <a href={schedule.url}>{schedule.url}</a>
                </p>
              )}
              {schedule.email && <p>Email: rajasegar.c@gmail.com</p>}
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default Staff;
