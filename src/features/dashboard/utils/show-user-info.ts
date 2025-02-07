import { ExtendedMessage } from "../types/chat";
import dayjs from "dayjs";

export const showUserInformation = (
  messages: ExtendedMessage[],
  messageId: string
) => {
  const currentIndex = messages.findIndex(
    (message) => message.id === messageId
  );

  if (currentIndex !== -1 && currentIndex > 0) {
    const prevMessage = messages[currentIndex - 1];
    const currentMessage = messages[currentIndex];

    const sameSender = prevMessage.sender.id === currentMessage.sender.id;
    if (!sameSender) return true;

    if (prevMessage.additionalResources.length > 0) return true;

    const prevMessageCreationTime = dayjs(prevMessage.createdAt);
    const currentMessageCreationTime = dayjs(currentMessage.createdAt);
    const timeDifference = currentMessageCreationTime.diff(
      prevMessageCreationTime,
      "seconds"
    );
    return timeDifference > 60;
  } else {
    return true;
  }
};
