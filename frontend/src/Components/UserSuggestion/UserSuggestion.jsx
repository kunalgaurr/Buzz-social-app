import './UserSuggestion.css';
import { useNavigate } from 'react-router-dom';

export const UserSuggestion = ({ user }) => {
  const navigate = useNavigate();
  const truncatedDescription =
    user.description.length > 20
      ? user.description.slice(0, 20) + '...'
      : user.description;
  return (
    <div
      id="user-suggestion-container"
      onClick={() => navigate(`/profile/${user._id}`)}
    >
      <img
        src={user.image === '' ? '/assets/user.png' : user.image}
        alt=""
        id="user-suggestion-image"
      />
      <div id="user-suggestion-wrapper">
        <span id="user-suggestion-name">{user.name}</span>
        <span id="user-suggestion-description">{truncatedDescription}</span>
      </div>
    </div>
  );
};
