export interface UserPayload {
  userId: number | undefined;
  sub: string;
  roles?: string[];
  exp: number;
}