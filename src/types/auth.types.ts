export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    scope: string;
    id_token: string;
    token_type: string;
    expires_in: number;
  }
  
  interface CustomField {
    customFieldId: string;
    customKey: string;
    customValue: string;
  }
  
  interface Membership {
    membershipId: string;
    organisationId: string;
    organisationName: string;
    roleName: string;
    token: string;
    organisationNumber: string;
    companyNumber: string;
  }
  
  interface UserApp {
    appName: string;
    onboardingAt?: string;
  }
  
  export interface UserProfileResponse {
    data: UserProfile;
  }
  
  export interface UserProfile {
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    isUSCitizen: boolean;
    status: string;
    lastLoginAt: string;
    contacts: any[];
    addresses: any[];
    listCustomFields: CustomField[];
    employmentDetails: any[];
    taxDetails: any[];
    memberships: Membership[];
    kycDetails: {
      documents: any[];
    };
    apps: UserApp[];
    listRoles: string[];
    permissions: any[];
    segments: any[];
    creditDetails: any[];
    createdAt: string;
    passwordExpired: boolean;
    updatedAt: string;
    cif: string;
    devices: any[];
  }