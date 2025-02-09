import { Message, AdditionalResourceTypes } from "@prisma/client";

export type AdditionalResource = {
  id: string;
  name: string;
  url: string;
  type: AdditionalResourceTypes;
};

export type ExtendedMessage = {
  additionalResources: AdditionalResource[];
  sender: {
    id: string;
    username: string;
    image?: string | null;
  };
} & Message;
