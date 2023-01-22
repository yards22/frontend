import { Anchor, Badge } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

function LiveScore() {
  return (
    <div className="p-8 text-gray-700">
      <div className="mb-10 flex flex-col items-center justify-center">
        <h2 className="m-0 w-full text-center text-gray-700">Live Scores</h2>
        <Badge color={"yellow"}>Coming Soon</Badge>
      </div>
      <h3>Calling all Cricket Fans!</h3>
      Get ready for the live scores experience on 22Yardz ! Never miss a moment
      of the action, whether it's an international match or a premier league.
      Our app provides real-time updates on runs scored, wickets taken, and all
      the other key details you need to stay on top of the game. Follow your
      favorite teams and players, and get notifications for important events
      like boundary hits and wicket falls. With detailed match summaries, player
      statistics, and exclusive video highlights, our app is the ultimate
      companion for cricket fans everywhere.
      <br />
      <br />
      It's not yet done 👇
      <br />
      <br />
      Whether you're a player, a coach, or a tournament organizer, our app has
      everything you need to run a successful local cricket tournament. With our
      app, you can easily register teams and players, schedule matches and get
      real-time updates on the results and standings. Our app also provides
      detailed scorecards, player statistics and schedule makers, making it easy
      to keep track of all the details of your tournament in one place. With
      this app, you can focus on what matters most - the game, while we take
      care of the rest. Elevate your cricket tournament experience with our
      all-in-one 22Yardz.
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

export default LiveScore;
