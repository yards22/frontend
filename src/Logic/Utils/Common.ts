export function CopyToClipboard(content: string) {
  return navigator.clipboard.writeText(content);
}

export function GetHostUrl() {
  let hostUrl = `${window.location.protocol}//${window.location.hostname}`;
  if (window.location.port !== "")
    hostUrl += `:${window.location.port}`;
  return hostUrl;
}
