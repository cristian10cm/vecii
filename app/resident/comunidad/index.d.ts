export type CommunityService = {
  createdAt: string;
  id: string;
  title: string;
  description: string;
  price: number;
  backgroundImage: {
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
  price:string
  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
export type servicioTomadoType = {
  createdAt: string;
  id: string;
  isConfirmed: boolean;
  rating: number | null;
  service: {
    createdAt: string;
    id: string;
    title: string;
    description: string;
    price: string;
  };
  user: {
    createdAt: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    identificationNumber: string;
    phoneNumber: string;
    cellPhoneNumber: string;
    isActive: boolean;
  };
  chat: {
    createdAt: string;
    id: string;
    name: string;
    description: string;
    type: string; 
  };
};