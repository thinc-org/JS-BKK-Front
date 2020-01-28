import { useId } from 'react-id-generator';

export default function Announcement() {
  const [headerId] = useId(1, 'Announcement');
  return (
    <section>
      <h2 id={headerId}>Announcement</h2>
      <p aria-labelledby={headerId}>This is the announcement</p>
    </section>
  );
}
