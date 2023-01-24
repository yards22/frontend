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
