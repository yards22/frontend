import styled from "styled-components";

const SProfilePhoto = styled.div`
  width: 130px;
  height: 130px;
  position: absolute;
  left: 25px;
  top: 134px;
  border-radius: 65px;
  background-color: red;
  border: 4px solid white;
`;

function ProfilePhoto() {
  return (
    <SProfilePhoto>
      <h1 style={{ color: "white" }}> S</h1>
    </SProfilePhoto>
  );
}

export default ProfilePhoto;
