import './Setting.css';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';

export const Setting = () => {
  return (
    <Wrapper>
      <Topbar />
      <PageWrapper>
        <div id="setting-container">
          <div className="setting-children">
            <span className="setting-header">Privacy settings</span>
            <span className="setting-text">
              Please set the privacy settings for a more scure and save browsing
              in Buzz, here your can make sure who can add you as a friend or
              not. If you choose to have a provate account then users can ssend
              you a friend request and they will be added to your friend list
              only if you accept the request.
            </span>
          </div>
          <div className="setting-children">
            <span className="setting-header">Show images</span>
            <span className="setting-text">
              Control who can watch and who cannot watch your posts, the default
              value is set as To everyone this means that everyone san see your
              posts, if you wish to change that you can change it by updating it
              as Friends only or Only me.
            </span>
          </div>
          <div className="setting-children">
            <span className="setting-header">Subscription</span>
            <span className="setting-text">
              Subscribe to <span>Buzz+</span> to get verification badge, and
              other premium user benefits along with messaging user who are not
              your friends and detailed statistics of your account.
            </span>
          </div>
        </div>
      </PageWrapper>
    </Wrapper>
  );
};
