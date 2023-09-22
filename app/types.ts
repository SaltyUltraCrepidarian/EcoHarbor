export type OfferCardType = {
  id?: number;
  cardBusinessImage?: string;
  description: string;
  available: string;
  location: string;
  about: string;
  createdAt: Date;
};

export type User = {
  id?: number;
  personalEmail: string;
  personalName: string;
  personalImage: string;
  businessName: string;
  businessEmail: string;
  businessPhoneNr: string;
  businessImage: string;
  businessAdress: string;
  rating?: number;
};
