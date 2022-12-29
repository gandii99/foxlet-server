export interface JwtTokenPayload {
  exp: number;
  data: {
    user_id: number;
    login: string;
  };
}

// user_id: string;
// login: string;
