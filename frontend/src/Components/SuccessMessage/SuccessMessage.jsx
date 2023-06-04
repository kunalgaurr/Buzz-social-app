import './SuccessMessage.css'

export const SuccessMessage = ({ success }) => {
  return (
    <div
      id="success-wrapper"
      style={{ display: success === undefined ? 'none' : 'block' }}
    >
      <span id="success-message">{`${success}`}</span>
    </div>
  );
};
