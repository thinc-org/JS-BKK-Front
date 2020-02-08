import { useState, useEffect } from 'react';
import { ModalStore } from '../../commons/stores/authModalStores';
import Modal from '../../commons/components/Modal';
import { Network } from '../../interfaces/Users';
import BadgeList from './BadgeList';
import { getNetworkingProfile } from '../../commons/hooks/networkingHooks';

interface Props {
  profile?: Network;
  modalStore: ModalStore;
}

const ProfileModal: React.FC<Props> = ({ profile, modalStore }) => {
  const [_profile, setProfile] = useState();

  useEffect(() => {
    getNetworkingProfile(`${profile?.uid}`).then(setProfile);
  }, [profile?.uid]);
  return (
    <Modal
      modalStore={modalStore}
      className='bg-dim top-0 p-6 min-h-500px z-50'
      aria-label='Networking Profile'
    >
      {!modalStore.isHidden && (
        <>
          <BadgeList id={profile?.badge} />
          <div className='text-xl font-bold my-4'>{profile?.name}</div>
          <div className='text-center'>{_profile?.data?.bio}</div>
        </>
      )}
    </Modal>
  );
};

export default ProfileModal;
