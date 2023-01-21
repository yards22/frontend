import { Burger, Title, useMantineTheme } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Search } from "react-feather";
import { useNavigate } from "react-router-dom";
import NavBarMobile from "./NavbarMobile/Index";

function TopBarMobile() {
  const mantineTheme = useMantineTheme();
  const [isNavBarOpened, setIsNavBarOpened] = useState(false);
  const navigate = useNavigate();
  return (
    <Observer>
      {() => {
        return (
          <div
            style={{
              background: mantineTheme.colors[mantineTheme.primaryColor][6],
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "100",
              right: "0",
              height: "60px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Burger
              opened={isNavBarOpened}
              color={"white"}
              style={{
                position: "absolute",
                left: "13px"
              }}
              onClick={() => {
                setIsNavBarOpened(!isNavBarOpened);
              }}
            />
            <Title color={"white"} order={5}>
              22 Yardz
            </Title>
            <Search
              style={{
                position: "absolute",
                right: "13px",
                color: "white"
              }}
              onClick={() => {
                navigate("/explore?inputFocus=true" + new Date().getTime());
              }}
            />
            {isNavBarOpened && (
              <NavBarMobile
                setIsNavBarOpened={(x: boolean) => setIsNavBarOpened(x)}
              />
            )}
          </div>
        );
      }}
    </Observer>
  );
}

export default TopBarMobile;
