export interface UserPayload {
  userId: number | undefined;
  userName: string | '';
  sub: string;
  roles?: string[];
  exp: number;
}