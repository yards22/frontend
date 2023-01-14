import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import UsersCard from "../../../Organs/UserCard";

const SPeopleRecommendationIndex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

function PeopleRecommendationIndex() {
  const { networkStore } = useStores();

  useEffect(() => {
    networkStore.GetRecommendation();
  }, []);

  return (
    <Observer>
      {() => {
        const { recommendation } = networkStore;
        if (!recommendation) return <p>Loading</p>;
        return (
          <SPeopleRecommendationIndex>
            <Text weight={"bold"}>Suggested Users For You</Text>
            <Carousel
              slideSize="33.333333%"
              slideGap="md"
              align="start"
              slidesToScroll={3}
              dragFree
            >
              {recommendation.map((item) => {
                return <UsersCard {...item} />;
              })}
            </Carousel>
          </SPeopleRecommendationIndex>
        );
      }}
    </Observer>
  );
}

export default PeopleRecommendationIndex;
