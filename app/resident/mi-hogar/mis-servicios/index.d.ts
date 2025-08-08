export type CommunityService = {
  createdAt: string;
  id: string;
  title: string;
  description: string;
  price: number;
  backgroundImage: {
    createdAt: string;
    id: string;
    name: string;
    type: string;
    size: number;
    path: string;
    attachableType: string;
    attachableId: string;
  };
  author: {
    createdAt: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    identificationNumber: string;
    phoneNumber: string;
    cellPhoneNumber: string;
  };
  complex: {
    createdAt: string;
    id: string;
    name: string;
    address: string;
    contactNumber: string;
    contactEmail: string;
  };
};

export interface datosComunidad {
  createdAt: string;
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
