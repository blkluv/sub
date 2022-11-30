/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ContentPreviewTO {
  id: string;
  pin_cid: string;
  pin_id: string;
  preview_cid: string;
  preview_pin_id: string;
  title: string;
  description: string;
}

export interface ContentPreviewResponseTo {
  /** @format double */
  status: number;
  preview: ContentPreviewTO;
}

export interface BaseResponseTO {
  /** @format double */
  status: number;
  statusText?: string;
  item?: any;
}

export interface IAccountDefaultPreview {
  previewId: string;
  title: string;
  description: string;
}

/**
 * A key/value object that can be associated with a piece of content in Pinata.
 */
export type MetadataTO = object;

/**
 * A piece of content that is stored in the pinata system.
 */
export interface ContentTO {
  id: string;

  /** @format date-time */
  createdAt: string;
  cid: string;
  name?: string;
  mimeType?: string;
  originalname?: string;

  /** @format double */
  size: number;

  /** A key/value object that can be associated with a piece of content in Pinata. */
  metadata?: MetadataTO;
  pinToIPFS?: boolean;
  isDuplicate?: boolean;
}

export interface ContentResponseTO {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;

  /** A piece of content that is stored in the pinata system. */
  item?: ContentTO;
  items?: ContentTO[];
}

export interface ContentRequestTO {
  /** @format double */
  cidVersion?: number;
  wrapWithDirectory?: boolean;
  pinToIPFS?: boolean;
  name?: string;
  metadata?: string | object;
}

/**
 * A JSON object content request that will be saved to the Pinata network.
 */
export interface JsonRequestTO {
  /** @format double */
  cidVersion?: number;
  wrapWithDirectory?: boolean;
  pinToIPFS?: boolean;
  name?: string;
  metadata?: string | object;
  content?: string | object;
}

export interface ContentUpdateTO {
  pinToIPFS?: boolean;
  name?: string;
}

export interface ShortenUrlResponseTo {
  short_url: string;
  long_url: string;
}

/**
 * A Pinata IPFS Gateway.
 */
export interface GatewayTO {
  id: string;

  /** @format date-time */
  createdAt?: string;
  domain: string;
  restrict: boolean;
  dnsId: string;
  zoneId: string;
  organizationId: string;
  pinningServiceCustomerId: string;
  customDomains: any[];
  settings: any;
}

export interface GatewayResponseTO {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;

  /** @format double */
  count?: number;

  /** A Pinata IPFS Gateway. */
  item?: GatewayTO;
  items?: GatewayTO[];
}

export interface ExistsReponse {
  /** @format double */
  status: number;
  statusText?: string;
  exists: boolean;
  valid?: boolean;
}

export interface RestrictedReponse {
  /** @format double */
  status: number;
  statusText?: string;
  restricted: boolean;
}

/**
 * A custom domain (joeswebsite.com) that can be mapped to a Pinata Gateway.
 */
export interface CustomDomainTO {
  id: string;
  sslValidationStatus: string;
  domainValidationStatus: string;
  domain: string;
}

export interface CustomDomainResponseTO {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;

  /** A custom domain (joeswebsite.com) that can be mapped to a Pinata Gateway. */
  item?: CustomDomainTO;
  items?: CustomDomainTO[];
}

export interface ResponseTO {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;
}

export interface GatewayDefaultContentTo {
  cid: string;
}

export interface GatewayContentResponseTo {
  /** @format double */
  status: number;
  content?: GatewayDefaultContentTo;
  statusText?: string;
}

export interface GatewaySettingRecord {
  id: string;

  /** @format date-time */
  createdAt: string;
  value: string;
}

export interface ProtectGatewayWithHostsDto {
  host: string;
}

export interface ProtectGatewayWithIPDto {
  ip: string;
}

/**
 * A single user on the Pinata system.
 */
export interface UserTO {
  id: string;
  email: string;
  role: string;
  status: string;
  organizationId: string;
}

export interface UserResponseTO {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;

  /** A single user on the Pinata system. */
  item?: UserTO;
  items?: UserTO[];
}

export interface UserStatusResponseTO {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;

  /** @format double */
  gateways: number;

  /** @format double */
  domains: number;

  /** @format double */
  uniqueFileSize: number;

  /** @format double */
  privateFileSize: number;

  /** @format double */
  publicFileSize: number;

  /** @format double */
  storedFileSize: number;
  pendingRemoval: boolean;
}

export interface UnfurlingTO {
  thumbnailUrl: string;
  title: string;
  description: string;
}

export interface UnfurlingResponseTO {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;
  item?: UnfurlingTO;
  items?: UnfurlingTO[];
}

export interface UtilizationTo {
  total: {
    bytes: { storedData: Record<string, number>; transferData: number };
    pins: Record<string, number>;
    optimizations: { streamedDataMinutes: number; imageRequests: number };
    gatewayRequests: number;
    customDomains: number;
    gateways: number;
  };

  /** @format double */
  collectionDate: number;
}

export interface UtilizationResponseTo {
  /** @format double */
  status: number;
  statusText?: string;

  /** @format double */
  totalItems?: number;
  item?: UtilizationTo;
  items?: UtilizationTo[];
}

export interface JWTRequest {
  /** @format double */
  timeoutSeconds?: number;
  contentIds?: string[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
          ...(requestParams.headers || {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
        body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title pinata-api
 * @version 1.6.1
 * @license ISC
 * @baseUrl /api/v1
 * @contact pinata <support@pinata.cloud> (https://pinata.cloud/support)
 *
 * The Pinata API is a content storage and IPFS distribution platform.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  preview = {
    /**
     * No description
     *
     * @name GetContentPreview
     * @request GET:/preview/content/{contentId}
     * @secure
     */
    getContentPreview: (contentId: string, params: RequestParams = {}) =>
      this.request<ContentPreviewResponseTo, any>({
        path: `/preview/content/${contentId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name SetContentPreview
     * @request PUT:/preview/content/{contentId}
     * @secure
     */
    setContentPreview: (contentId: string, data: any, params: RequestParams = {}) =>
      this.request<ContentPreviewResponseTo, any>({
        path: `/preview/content/${contentId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name RemoveContentPreview
     * @request DELETE:/preview/content/{previewId}
     * @secure
     */
    removeContentPreview: (previewId: string, params: RequestParams = {}) =>
      this.request<BaseResponseTO, any>({
        path: `/preview/content/${previewId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetAccountDefaultPreview
     * @request GET:/preview/account
     * @secure
     */
    getAccountDefaultPreview: (params: RequestParams = {}) =>
      this.request<ContentPreviewResponseTo, any>({
        path: `/preview/account`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name SetAccountDefaultPreview
     * @request PUT:/preview/account
     * @secure
     */
    setAccountDefaultPreview: (data: IAccountDefaultPreview, params: RequestParams = {}) =>
      this.request<BaseResponseTO, any>({
        path: `/preview/account`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name RemoveAccountDefaultPreview
     * @request DELETE:/preview/account
     * @secure
     */
    removeAccountDefaultPreview: (params: RequestParams = {}) =>
      this.request<BaseResponseTO, any>({
        path: `/preview/account`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  content = {
    /**
     * @description Adds content to the system.  This can handle one or more files but does not support directories.
     *
     * @name AddContent
     * @request POST:/content
     * @secure
     */
    addContent: (data: ContentRequestTO, params: RequestParams = {}) =>
      this.request<ContentResponseTO, any>({
        path: `/content`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows for the retrieval of content listings one page at a time.
     *
     * @name GetContent
     * @request GET:/content
     * @secure
     */
    getContent: (
      query?: {
        offset?: number;
        limit?: number;
        includepaths?: boolean;
        cidContains?: string;
        name?: string;
        originalname?: string;
        pinSizeMin?: number;
        pinSizeMax?: number;
        pinToIPFS?: boolean;
        createdAtStart?: string;
        createdAtEnd?: string;
        metadata?: string;
        orderBy?: string;
        order?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ContentResponseTO, any>({
        path: `/content`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a json payload as the body of the post and saves it into the content store.
     *
     * @name AddJsonContent
     * @request POST:/content/json
     * @secure
     */
    addJsonContent: (data: JsonRequestTO, params: RequestParams = {}) =>
      this.request<ContentResponseTO, any>({
        path: `/content/json`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Allows for the retrieval of content listings one page at a time.
     *
     * @name GetChildContent
     * @request GET:/content/{id}/list
     * @secure
     */
    getChildContent: (
      id: string,
      query?: { includepaths?: boolean; offset?: number; limit?: number },
      params: RequestParams = {}
    ) =>
      this.request<ContentResponseTO, any>({
        path: `/content/${id}/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes content from the system.
     *
     * @name DeleteContent
     * @request DELETE:/content/{id}
     * @secure
     */
    deleteContent: (id: string, params: RequestParams = {}) =>
      this.request<ContentResponseTO, any>({
        path: `/content/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Starts the process of removing content from the system.
     *
     * @name FindById
     * @request GET:/content/{id}
     * @secure
     */
    findById: (id: string, params: RequestParams = {}) =>
      this.request<ContentResponseTO, any>({
        path: `/content/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the provided metadata onto the given piece of content.
     *
     * @name Update
     * @request PUT:/content/{id}
     * @secure
     */
    update: (id: string, data: ContentUpdateTO, params: RequestParams = {}) =>
      this.request<ContentResponseTO, any>({
        path: `/content/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the provided metadata onto the given piece of content.
     *
     * @name SetMetadata
     * @request PUT:/content/{id}/metadata
     * @secure
     */
    setMetadata: (id: string, data: any, params: RequestParams = {}) =>
      this.request<ContentResponseTO, any>({
        path: `/content/${id}/metadata`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ShortenUrl
     * @request POST:/content/{id}/shorten
     * @secure
     */
    shortenUrl: (id: string, params: RequestParams = {}) =>
      this.request<ShortenUrlResponseTo, any>({
        path: `/content/${id}/shorten`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  utilization = {
    /**
     * No description
     *
     * @name UtilizationForUser
     * @request GET:/utilization/latest
     * @secure
     */
    utilizationForUser: (params: RequestParams = {}) =>
      this.request<UtilizationResponseTo, any>({
        path: `/utilization/latest`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UtilizationForWindow
     * @request GET:/utilization/window
     * @secure
     */
    utilizationForWindow: (
      query: { startDate: string; endDate: string },
      params: RequestParams = {}
    ) =>
      this.request<UtilizationResponseTo, any>({
        path: `/utilization/window`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @name GetKeys
     * @request GET:/auth/keys
     * @secure
     */
    getKeys: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/auth/keys`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateKey
     * @request POST:/auth/keys
     * @secure
     */
    createKey: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/auth/keys`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteKey
     * @request DELETE:/auth/keys/{id}
     * @secure
     */
    deleteKey: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/auth/keys/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateScopedJwt
     * @request POST:/auth/content/jwt
     * @secure
     */
    createScopedJwt: (data: JWTRequest, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/auth/content/jwt`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
