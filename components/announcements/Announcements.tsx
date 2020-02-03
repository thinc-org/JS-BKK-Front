/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import { useId } from 'react-id-generator';
import { getFirebase } from '../../commons/firebase';

function useAnnouncement() {
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

export default function Announcements() {
  const [headerId] = useId(1, 'Announcement');
  const announcement = useAnnouncement();
  if (announcement === 'loading') {
    return <section>(Loading announcement)</section>;
  }
  if (!announcement) return null;
  return (
    <section>
      <h2 id={headerId}>Announcement</h2>
      <p
        aria-labelledby={headerId}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: announcement.text }}
      />
    </section>
  );
}
