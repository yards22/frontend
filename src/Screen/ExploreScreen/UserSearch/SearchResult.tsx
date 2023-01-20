import { Text } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import Loading from "../../../Atoms/Loading";
import { useStores } from "../../../Logic/Providers/StoresProviders";
import UserTile from "../../../Organs/UserTile";

function SearchResult() {
  const { networkStore } = useStores();
  return (
    <div>
      <Observer>
        {() => {
          const { searches } = networkStore;
          if (searches === undefined) return <></>;
          if (searches === null) return <Loading />;
          if (searches.length === 0) return <b>No result found.</b>;
          return (
            <div>
              <Text weight={"bold"} className="mt-4">
                Search Result
              </Text>
              {searches.map((item) => {
                return (
                  <UserTile {...item} key={"search_user" + item.user_id} />
                );
              })}
            </div>
          );
        }}
      </Observer>
    </div>
  );
}

export default SearchResult;
