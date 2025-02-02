import { getRequestConfig } from "next-intl/server";

// TODO: deprecated
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./src/messages/${locale}.json`)).default,
}));
