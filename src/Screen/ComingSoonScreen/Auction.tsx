import { Anchor, Badge } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
function Auction() {
  return (
    <div className="p-8 text-gray-700">
      <div className="mb-10 flex flex-col items-center justify-center">
        <h2 className="m-0 w-full text-center text-gray-700">Auction Table</h2>
        <Badge color={"yellow"}>Coming Soon</Badge>
      </div>
      <h3>Calling all Cricket Fans!</h3>
      Get ready for the ultimate fantasy cricket experience on 22Yardz, the
      social media platform for cricket enthusiasts. We're thrilled to announce
      that we are working on our new player auction feature, where you can bid
      on your favorite players and create your own team to compete against other
      users in real-time matches.
      <br />
      <br />
      Our new feature is similar to fantasy league but with a twist, you'll be
      able to bid for players and build a team like never before. Experience the
      excitement of building your dream team and competing against other cricket
      fans from around the world.
      <br />
      <br />
      The auction feature is easy to use and provides a seamless experience.
      Simply place your bids on the players you want and watch as your team
      takes shape. Don't miss out on the chance to connect with other cricket
      fans and put your team-building skills to the test.
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

export default Auction;
