import { Message, AdditionalResourceTypes } from '@prisma/client';

export interface AdditionalResource {
  id: string;
  name: string;
  url: string;
  type: AdditionalResourceTypes;
}

export interface ExtendedMessage extends Message {
  additionalResources: AdditionalResource[];
  sender: {
    id: string;
    username: string;
    image?: string | null;
  };
}