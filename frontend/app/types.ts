export interface StrapiErrorResponse {
  error?: {
    statusCode: number;
    error: string;
    message: string;
  };
}

export interface StrapiUserResponse {
  id: number;
  username: string;
  bio: string;
  image: {
    id: string;
    url: string;
    alternativeText: string;
  };
}
