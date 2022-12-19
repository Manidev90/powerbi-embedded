import { useMsal } from "@azure/msal-react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { ReactComponent as ProfilePic } from "../../assets/user.svg";
import NavMenuButton from "./NavMenuButton";

const Name = styled.p`
  font-weight: 400;
`;

const Username = styled.p`
  color: #a7a7a7 !important;
  font-size: 0.8em;
  /* margin: 8px 16px 10px; */
`;

const Profile = styled.div`
  margin-bottom: 1rem;

  ${Name},
  ${Username} {
    margin: 0;
    overflow: hidden;
    max-width: 30ch;
    text-overflow: ellipsis;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignOutLink = styled.a`
  float: right;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

function SignOutButton() {
  const { instance } = useMsal();
  const handleCLick = () => {
    instance
      .logoutRedirect({
        account: instance.getActiveAccount(),
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return <SignOutLink onClick={handleCLick}>Logout</SignOutLink>;
}

function ProfileIcon() {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  return (
    <NavMenuButton Icon={ProfilePic}>
      <div className="mx-3 my-2">
        <Profile>
          <Name>{account?.name}</Name>
          <Username>{account?.username}</Username>
        </Profile>

        <Wrapper>
          <Button
            as="a"
            href="https://nttdatagroup.sharepoint.com/teams/srvs-ics-analyticsandperformancemanagement/Lists/Request_Tracker/AllItems.aspx"
          >
            My Subscriptions
          </Button>
          <SignOutButton />
        </Wrapper>
      </div>
    </NavMenuButton>
  );
}

export default ProfileIcon;
