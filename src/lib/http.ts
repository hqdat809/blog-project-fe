/* eslint-disable @typescript-eslint/no-explicit-any */
type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

export const isClient = () => typeof window !== "undefined";

let clientLogoutRequest: null | Promise<any> = null;

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  //   Nếu body là formData thì = {}
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ process.env.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body,
    method,
    // set request with the cookies for be
    credentials: "include",
  });

  const payload = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  // Interceptor;
  if (!res.ok) {
    if (res.status === 401) {
      if (isClient()) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("/api/auth/logout", {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as any,
          });
          try {
            await clientLogoutRequest;
          } catch (error) {
            console.log(error);
          } finally {
            clientLogoutRequest = null;
            location.href = "/login";
          }
        }
      }
    } else {
      throw new HttpError(data);
    }
  }

  if (isClient()) {
    if ("auth/logout" === url) {
    }
  }
  return data;
};

export const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};
