import SanityClient from "@sanity/client";
import { createClient } from '@sanity/client';

import ImageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "5ai4z9bg",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;