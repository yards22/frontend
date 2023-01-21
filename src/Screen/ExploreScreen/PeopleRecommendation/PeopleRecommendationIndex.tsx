import { Carousel } from "@mantine/carousel";
import { createStyles, Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";
import Loading from "../../../Atoms/Loading";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import UsersCard from "../../../Organs/UserCard";

const SPeopleRecommendationIndex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 30px;
`;

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1
      }
    }
  }
}));

function PeopleRecommendationIndex() {
  const { networkStore } = useStores();
  const { classes } = useStyles();

  useEffect(() => {
    networkStore.GetRecommendation();
  }, []);

  return (
    <Observer>
      {() => {
        const { recommendation } = networkStore;
        if (!recommendation) return <Loading />;
        if (recommendation.length === 0)
          return (
            // <p className="flex h-[100px] w-full items-center justify-center rounded-lg border border-solid border-blue-400 bg-blue-50 font-bold text-blue-800">
            //   We still finding best people for you. Stay tuned!
            // </p>
            <b className="flex h-[140px] w-full items-center justify-center text-center text-lg font-bold text-gray-400">
              We still finding best people for you. <br></br>Stay Tuned!
            </b>
          );
        return (
          <SPeopleRecommendationIndex>
            <Text weight={"bold"} className="mb-2">
              Suggested Users For You
            </Text>
            <Carousel
              slideGap="md"
              align="start"
              controlsOffset="xs"
              dragFree
              draggable
              classNames={classes}
            >
              {recommendation.map((item) => {
                return (
                  <UsersCard {...item} key={"recom_user" + item.user_id} />
                );
              })}
            </Carousel>
          </SPeopleRecommendationIndex>
        );
      }}
    </Observer>
  );
}

export default PeopleRecommendationIndex;
