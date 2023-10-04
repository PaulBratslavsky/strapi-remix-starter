export interface StrapiErrorResponse {
  error?: {
    statusCode: number;
    error: string;
    message: string;
  };
}


export interface StrapiUserResponse {
  user: {
    id: number;
    username: string;
  }
}