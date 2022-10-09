import { action, makeAutoObservable, observable } from "mobx";
import { MNotification, MUINotification } from "../Model/MNotification";
import LinkedUserName from "../../Atoms/LinkedUserName";
import ago from "s-ago";
import {
  dummyNotifications,
  dummyUserIdUsername,
} from "../../Data/Dummies/Notification";

const TOKEN_KEY = "token";

export class NotificationStore {
  rawNotifications: MNotification[] = [];
  uid_uname: Map<number, string>;
  @observable finalNotifications: MUINotification[] = [];
  @observable isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.uid_uname = dummyUserIdUsername;
    this.rawNotifications = dummyNotifications;

    this.GetNotifications();
  }

  @action
  SetLoading = (v: boolean) => {
    this.isLoading = v;
  };

  @action
  GetNotifications = async () => {
    // network call here to get raw notifications

    await this.GetUserNamesFor(
      this.rawNotifications.map((item) => item.metadata.by)
    );

    const temp: Map<string, MNotification[]> = new Map();
    this.rawNotifications.forEach((item, index) => {
      let namespace = `${item.metadata.type}`;
      if (
        item.metadata.type === "LIKE" ||
        item.metadata.type === "COMMENT" ||
        item.metadata.type === "SHARE"
      )
        namespace += `_${item.metadata.post_id}`;

      if (item.metadata.type === "NEW") namespace += item.id.toString();

      const existing = temp.get(namespace) || [];
      existing.push(item);
      temp.set(namespace, existing);
    });

    this.finalNotifications = [];
    // now create ui notification out of raw notifications
    temp.forEach((mapItem, mapKey) => {
      let finalStatus = mapItem[0].status;
      let finalDate = mapItem[0].created_at;
      let stashes: BigInt[] = [];
      let usernames = (
        <LinkedUserName
          username={this.uid_uname.get(mapItem[0].metadata.by) || ""}
        />
      );
      if (mapItem.length !== 1) {
        let enough = false;
        usernames = (
          <>
            {mapItem.map((eachNotification, eachNotificationIndex) => {
              stashes.push(eachNotification.id);
              if (eachNotification.status === "unseen")
                finalStatus = eachNotification.status;
              if (eachNotification.created_at > finalDate)
                finalDate = eachNotification.created_at;

              if (eachNotificationIndex === 3) enough = true;
              if (enough) return <></>;
              return (
                <>
                  {eachNotificationIndex === mapItem.length - 1
                    ? " and "
                    : eachNotificationIndex === 0
                    ? ""
                    : ", "}
                  {eachNotificationIndex === 2 ? (
                    "others"
                  ) : (
                    <LinkedUserName
                      username={
                        this.uid_uname.get(eachNotification.metadata.by) || ""
                      }
                    />
                  )}
                </>
              );
            })}
          </>
        );
      }

      let suffix = "";
      if (mapItem[0].metadata.type === "LIKE") {
        suffix += " liked your post.";
      } else if (mapItem[0].metadata.type === "COMMENT") {
        suffix += " commented on your post.";
      } else if (mapItem[0].metadata.type === "SHARE") {
        suffix += " shared your post.";
      } else if (mapItem[0].metadata.type === "FOLLOW") {
        suffix += " started to follow you.";
      }

      const finalNotification: MUINotification = {
        stashes,
        content:
          mapItem[0].metadata.type === "NEW" ||
          mapItem[0].metadata.type === "INFO" ? (
            mapItem[0].metadata.content
          ) : (
            <>
              {usernames} {suffix}
            </>
          ),
        happened: ago(finalDate),
        type: mapItem[0].metadata.type,
        extra: {
          post_id: mapItem[0].metadata.post_id,
          redirect_url: mapItem[0].metadata.redirect_url,
        },
        status: finalStatus,
      };

      this.finalNotifications.push(finalNotification);
      this.finalNotifications.sort((a, b) => {
        return a.happened > b.happened ? 1 : 0;
      });
    });
  };

  @action
  GetUserNamesFor = async (ids: number[]) => {
    const fetchUsernameFor: number[] = [];
    ids.forEach((item) => {
      if (!this.uid_uname.has(item)) fetchUsernameFor.push(item);
    });

    // network call to get username of fetchUsernameFor
    const res: string[] = [];

    res.forEach((item, index) => {
      this.uid_uname.set(fetchUsernameFor[index], item);
    });
  };

  @action
  MarkAsRead = (ids: BigInt[]) => {
    // network call to make it read
  };
}
