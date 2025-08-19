export const validationRegex = {
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/g,
};

export const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
