import {
  action,
  makeAutoObservable,
  observable,
} from "mobx";
import {
  MNotification,
  MUINotification,
} from "../Model/MNotification";
import LinkedUserName from "../../Atoms/LinkedUserName";
import ago from "s-ago";
import { NotificationRepo } from "../Repository/NotificationRepo";

const TOKEN_KEY = "token";

export class NotificationStore {
  uid_uname: Map<number, string>;
  @observable finalNotifications: MUINotification[] = [];
  @observable isLoading: boolean = false;
  notificationRepo: NotificationRepo;
  @observable token: string | null = null;

  constructor(notificationRepo: NotificationRepo) {
    makeAutoObservable(this);
    this.uid_uname = new Map();
    this.notificationRepo = notificationRepo;
    this.token = window.localStorage.getItem(TOKEN_KEY);
    this.GetNotifications();
  }

  @action
  SetLoading = (v: boolean) => {
    this.isLoading = v;
  };

  @action
  GetNotifications = async () => {
    // network call here to get raw notifications

    const rawNotifications =
      (await this.notificationRepo.getNotifications(
        this.token || "",
      )) || [];
    await this.GetUserNamesFor(
      rawNotifications.map(
        (item) => item.triggered_by_id || 0,
      ),
    );

    const temp: Map<string, MNotification[]> = new Map();
    rawNotifications.forEach((item, index) => {
      let namespace = `${item.type}`;
      if (item.type === "POST")
        namespace += `_${item.entity_identifier}`;

      if (item.type === "NEW")
        namespace += item.id.toString();

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
          username={
            this.uid_uname.get(
              mapItem[0].triggered_by_id || 0,
            ) || ""
          }
        />
      );
      if (mapItem.length !== 1) {
        let enough = false;
        usernames = (
          <>
            {mapItem.map(
              (eachNotification, eachNotificationIndex) => {
                stashes.push(eachNotification.id);
                if (eachNotification.status === "Unseen")
                  finalStatus = eachNotification.status;
                if (eachNotification.created_at > finalDate)
                  finalDate = eachNotification.created_at;

                if (eachNotificationIndex === 3)
                  enough = true;
                if (enough) return <></>;
                return (
                  <>
                    {eachNotificationIndex ===
                    mapItem.length - 1
                      ? " and "
                      : eachNotificationIndex === 0
                      ? ""
                      : ", "}
                    {eachNotificationIndex === 2 ? (
                      "others"
                    ) : (
                      <LinkedUserName
                        username={
                          this.uid_uname.get(
                            eachNotification.triggered_by_id ||
                              0,
                          ) || ""
                        }
                      />
                    )}
                  </>
                );
              },
            )}
          </>
        );
      }

      let suffix = "";
      if (mapItem[0].type === "LIKE") {
        suffix += " liked your post.";
      } else if (mapItem[0].type === "COMMENT") {
        suffix += " commented on your post.";
      } else if (mapItem[0].type === "SHARE") {
        suffix += " shared your post.";
      } else if (mapItem[0].type === "FOLLOW") {
        suffix += " started to follow you.";
      }

      const finalNotification: MUINotification = {
        stashes,
        content:
          mapItem[0].type === "NEW" ||
          mapItem[0].type === "INFO" ? (
            mapItem[0].extra.content
          ) : (
            <>
              {usernames} {suffix}
            </>
          ),
        happened: ago(finalDate),
        type: mapItem[0].type,
        extra: {
          post_id: mapItem[0].entity_identifier,
          redirect_url: mapItem[0].extra
            ? mapItem[0].extra.redirect_url
            : "",
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
      if (!this.uid_uname.has(item))
        fetchUsernameFor.push(item);
    });

    // network call to get username of fetchUsernameFor

    const res: {
      user_id: number;
      username: string;
    }[] = await this.notificationRepo.getUsernames(
      this.token || "",
      ids,
    );

    res.forEach((v) => {
      this.uid_uname.set(v.user_id, v.username);
    });
  };

  @action
  MarkAsRead = (ids: BigInt[]) => {
    // network call to make it read
  };
}
