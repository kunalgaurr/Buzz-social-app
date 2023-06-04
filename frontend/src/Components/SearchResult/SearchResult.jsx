import './SearchResult.css';
import { UserSuggestion } from '../UserSuggestion/UserSuggestion';

export const SearchResult = ({ users }) => {
  if (users.length === 0) {
    return <span>Oops, No result found.</span>;
  }
  return (
    <div id="search-result-container">
      {users.map((user) => (
        <UserSuggestion user={user} />
      ))}
    </div>
  );
};
