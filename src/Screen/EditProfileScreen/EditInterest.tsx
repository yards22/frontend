import { Badge, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Award, Globe } from "react-feather";
import {
  InternationalTeamList,
  LeaguesAndTournamentsList,
} from "../../Data/Static/Interests";
import { useStores } from "../../Logic/Providers/StoresProviders";

function EditInterest() {
  const [ifInterestedIn, setIfInterestedIn] = useState<Map<string, boolean>>(
    new Map()
  );
  const [isInitialInterestSet,setInitialInterestsSet] = useState(false)
  const stores = useStores();
  useEffect(() => {
    const p: Map<string, boolean> = new Map(ifInterestedIn);
    (stores.profileStore.profile?.interests || []).forEach((item) => {
      p.set(item, true);
    });
    setIfInterestedIn(p);
    setInitialInterestsSet(true)
  }, []);

  useEffect(() => {
    if(isInitialInterestSet){
      const newInterests: string[] = [];
      console.log(ifInterestedIn)
      ifInterestedIn.forEach((_, key) => {
        newInterests.push(key);
      });
      console.log("new",newInterests)
      stores.profileStore.SetProfile({
        ...stores.profileStore.profile,
        interests: newInterests,
      } as any);
    }
  }, [ifInterestedIn, stores.profileStore]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
    >
      <div style={{ marginTop: "10px" }}>
        <Title order={5}>International Teams</Title>
        {InternationalTeamList.map((item, index) => {
          return (
            <Badge
              key={"interest" + item.value + index}
              radius={"sm"}
              onClick={() => {
                const p: Map<string, boolean> = new Map(ifInterestedIn);
                const current = p.has(item.value) ? p.get(item.value) : false;
                p.set(item.value, !current);
                setIfInterestedIn(p);
              }}
              size="lg"
              variant={ifInterestedIn.get(item.value) ? "filled" : "outline"}
              style={{
                marginTop: "10px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              leftSection={<Globe size={"12px"} />}
            >
              {item.label}
            </Badge>
          );
        })}
      </div>
      <div style={{ marginTop: "20px" }}>
        <Title order={5}>Leagues And Tournaments</Title>
        {LeaguesAndTournamentsList.map((item, index) => {
          return (
            <Badge
              key={"interest" + item.value + index}
              color={"cyan"}
              onClick={() => {
                const p: Map<string, boolean> = new Map(ifInterestedIn);
                const current = p.has(item.value) ? p.get(item.value) : false;
                p.set(item.value, !current);
                setIfInterestedIn(p);
              }}
              radius={"sm"}
              size="lg"
              variant={ifInterestedIn.get(item.value) ? "filled" : "outline"}
              style={{
                marginTop: "10px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              leftSection={<Award size={"12px"} />}
            >
              {item.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export default EditInterest;
