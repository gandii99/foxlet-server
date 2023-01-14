export interface JwtTokenPayload {
  exp: number;
  data: {
    user_id: number;
    login: string;
    avatar: string;
  };
}

// user_id: string;
// login: string;
