import styled from "styled-components";
import { Divider, Text } from "@mantine/core";
import { interestsDummyData } from "../../../Data/Dummies/Interests";
import InterestSectionCard from "./InterestSectionCard";

const SInterestsSection = styled.div`
  margin-top: 20px;
`;

const SInterestCardsSection = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function InterestsSection() {
  return (
    <SInterestsSection>
      <Text italic size={"xl"} style={{ marginLeft: "5px" }}>
        Interests
      </Text>
      <Divider my="sm" color={"black"} style={{ marginTop: "5px" }} />
      <SInterestCardsSection
        style={{
          display: "flex",
          overflow: "auto",
        }}
        className="hideScrollBar"
      >
        {interestsDummyData.map((each: any) => (
          <InterestSectionCard
            key={each.label}
            label={each.label}
            description={each.description}
            image={each.image}
          />
        ))}
      </SInterestCardsSection>
    </SInterestsSection>
  );
}
