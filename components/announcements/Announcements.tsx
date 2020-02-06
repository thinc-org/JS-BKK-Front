/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect, useMemo } from 'react';
import { useId } from 'react-id-generator';
import { getFirebase } from '../../commons/firebase';

export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<
    { text: string } | 'loading' | null
  >('loading');
  useEffect(() => {
    let cancel: () => void;
    const cancelPromise = new Promise(resolve => {
      cancel = resolve;
    });
    (async () => {
      const firebase = await getFirebase();
      const ref = firebase.getEnvRef().child('announcement');
      const onValue = (snapshot: any) => {
        setAnnouncement(snapshot.val());
      };
      // eslint-disable-next-line no-console
      ref.on('value', onValue, console.error);
      cancelPromise.then(() => {
        ref.off('value', onValue);
      });
    })();
    return () => cancel();
  });
  return announcement;
}

const AnnouncementContent: React.FC<{ text: string; headerId: string }> = ({
  text,
  headerId
}) => {
  const Announcement = useMemo(
    () => (
      <p
        aria-labelledby={headerId}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: text }}
      />
    ),
    [text]
  );

  return (
    <section>
      <h2 className='text-xl font-bold' id={headerId}>
        Announcements
      </h2>
      {Announcement}
    </section>
  );
};

export default function Announcements() {
  const [headerId] = useId(1, 'Announcement');
  const announcement = useAnnouncement();

  if (announcement === 'loading') {
    return <section>(Loading announcement)</section>;
  }
  if (!announcement) return null;

  return <AnnouncementContent headerId={headerId} text={announcement.text} />;
}
