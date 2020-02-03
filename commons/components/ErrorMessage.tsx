export default function ErrorMessage(props: { error?: any }) {
  const { error } = props;
  return (
    <div
      className='rounded p-4'
      style={{ background: 'white', color: 'red', border: '4px solid red' }}
    >
      <strong>Something went wrong!</strong>
      <br />
      {String(error)}
    </div>
  );
}
