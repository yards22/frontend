import { Anchor, Badge } from "@mantine/core";
import { Link } from "react-router-dom";
import NewsImage from "../../Logos/news.jpeg";

function News() {
  return (
    <div className="p-8 text-gray-700">
      <div className="mb-10 flex flex-col items-center justify-center">
        <h2 className="m-0 w-full text-center text-gray-700">News Articles</h2>
        <Badge color={"yellow"}>Coming Soon</Badge>
      </div>
      <h3>Calling all Cricket Fans!</h3>
      Introducing the ultimate cricket news app on 22Yardz ! Get the latest
      news, updates, and analysis on all your favorite teams and players,
      without any distractions. Our app provides in-depth coverage on everything
      from international matches to domestic leagues and local tournaments, with
      a focus on delivering the news in a precise and ad-free manner.
      <br />
      <br />
      <img
        src={NewsImage}
        alt="news_image"
        className="max-w-[90%] object-scale-down"
      />
      <br />
      <br />
      You'll never miss a moment of the action, with real-time updates on the
      latest scores, player performances, and team standings. Plus, our app
      includes expert analysis and opinion pieces, so you can stay informed and
      up-to-date on all the latest developments in the world of cricket. So,
      Stay tuned to 22Yardz and stay ahead of the game.
      <br />
      <br />
      <b>
        Till then, you can{" "}
        <Link to={"/explore"}>
          <Anchor>Explore</Anchor>
        </Link>{" "}
        some trending posts and make new cricket friends!
      </b>
    </div>
  );
}

export default News;
