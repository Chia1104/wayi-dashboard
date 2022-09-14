export type ApiRespond<T = any> = {
  code?: number;
  status?: string;
  message: string;
  data?: T;
};
