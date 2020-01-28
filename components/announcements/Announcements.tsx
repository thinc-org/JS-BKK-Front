import React, { useState, useEffect } from 'react';
import { useId } from 'react-id-generator';
import { getFirebase } from '../../commons/firebase';
function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<{ text: string } | null>(
    null
  );
  useEffect(() => {
    let cancel: () => void;
    const cancelPromise = new Promise(resolve => {
      cancel = resolve;
    });
    (async () => {
      const firebase = await getFirebase();
      const ref = firebase.database().ref('environments/test/announcement');
      const onValue = (snapshot: any) => {
        console.log('z');
        setAnnouncement(snapshot.val());
      };
      ref.on('value', onValue, console.error);
      cancelPromise.then(() => {
        ref.off('value', onValue);
      });
    })();
    return () => cancel();
  });
  return announcement;
}

export default function Announcement() {
  const [headerId] = useId(1, 'Announcement');
  const announcement = useAnnouncement();
  if (!announcement) return null;
  return (
    <section>
      <h2 id={headerId}>Announcement</h2>
      <p aria-labelledby={headerId}>{announcement.text}</p>
    </section>
  );
}
