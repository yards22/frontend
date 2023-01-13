import { Carousel } from "@mantine/carousel";
import styled from "styled-components";
import { useStores } from "../../../Logic/Providers/StoresProviders";
interface NormalPostMediaProps {
  media: string[];
}

const SFeedPostImage = styled.img`
  width: 100%;
  object-fit: contain;
  max-height: 400px;
`;
function NormalPostMedia(props: NormalPostMediaProps) {
  const stores = useStores();
  return (
    <div
      style={{
        margin: "10px 0",
      }}
    >
      <Carousel
        withControls={stores.appStore.isDesktop}
        withIndicators
        styles={{
          indicator: {
            width: 12,
            height: 4,
            transition: "width 250ms ease",
            background: "gray",
            "&[data-active]": {
              width: 40,
            },
          },
          controls: {
            opacity: 0.2,
          },
        }}
      >
        {props.media.map((each, index) => {
          return (
            <Carousel.Slide key={each}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SFeedPostImage src={each} />
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
}

export default NormalPostMedia;
