import { Observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import Loading from "../../Atoms/Loading";
import { MPoll } from "../../Logic/Model/MPoll";
import { useStores } from "../../Logic/Providers/StoresProviders";
import PollCard from "../../Organs/LeftFooter/Poll/PollCard";

function getOptions(poll: MPoll): { title: string; votes: number }[] {
  const res: { title: string; votes: number }[] = [];
  poll.poll.options.forEach((option, index) => {
    let count = 0;
    poll.reaction.forEach((rx) => {
      if (rx.type === index) count++;
    });
    res.push({ title: option, votes: count });
  });
  return res;
}
function PollsScreenIndex() {
  const stores = useStores();

  useEffect(() => {
    stores.appStore.setNavigationState(6);
    if (!stores.miscStore.polls) stores.miscStore.GetPolls();
  }, []);

  return (
    <Observer>
      {() => {
        const { miscStore } = stores;
        if (!miscStore.polls) return <Loading />;
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {miscStore.polls.map((each) => {
              return (
                <div
                  style={{ margin: "10px" }}
                  key={"poll_page_poll" + each.poll.poll_id}
                >
                  <PollCard
                    hasPolled={each.hasPolled}
                    pollId={each.poll.poll_id}
                    question={each.poll.poll_question}
                    options={getOptions(each)}
                  />
                </div>
              );
            })}
          </div>
        );
      }}
    </Observer>
  );
}

export default PollsScreenIndex;
