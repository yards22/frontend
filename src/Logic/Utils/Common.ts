export function CopyToClipboard(content: string) {
  return navigator.clipboard.writeText(content);
}

export function GetHostUrl() {
  let hostUrl = `${window.location.protocol}//${window.location.hostname}`;
  if (window.location.port !== "") hostUrl += `:${window.location.port}`;
  return hostUrl;
}

export function HashWithDate(
  date: Date,
  data: string | number | bigint
): string {
  const dateInStr = date.getTime() + "";
  const str = `sh${dateInStr.length}d${dateInStr}${data}`;
  return str;
}

export function DeHashWithDate(hash: string): string {
  const splits = hash.split("d");
  if (splits.length < 2) return "";
  const dateLen = Number(splits[0].substring(2));
  return splits[1].substring(dateLen);
}

export function validateUsername(username: string) {
  if (username.length < 6 || username.length > 18)
    return new Error("Username length should be between 6 and 18.");

  if (username.includes(" "))
    return new Error("Username cannot contain spaces.");

  if (!isAlpha(username[0]))
    return new Error(
      "Username cannot start with a number, special character or spaces."
    );

  return null;
}

var isAlpha = function (ch: string) {
  return typeof ch === "string" && ch.length === 1 && /[A-Za-z]/.test(ch);
};
