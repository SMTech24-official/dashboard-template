export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
      accessToken: string;
    };
  }
  
  export interface UserProfile {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    role: string;
    profilePicture?: string | null;
    coverPicture?: string | null;
    isOnline: boolean;
    createdAt: string;
  }
  
  export interface RegisterRequest {
    fullName?: string;
    userName: string;
    email: string;
    password: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
      message: string;
    };
  }