class ResponseError extends Error {
  code: number;
  bodyMessage: number;
  constructor(code: number, bodyMessage: number) {
    super();
    this.code = code;
    this.bodyMessage = bodyMessage;
  }
}

export async function CheckResponse(
  res: Response,
  mustCode: number
): Promise<{ body: any; message: string | null }> {
  const body = await res.json();
  if (res.status !== mustCode) {
    throw new ResponseError(res.status, body.message || "");
  }
  if (body.is_error) {
    throw new ResponseError(res.status, body.message || "");
  }
  return { body, message: body.message };
}
