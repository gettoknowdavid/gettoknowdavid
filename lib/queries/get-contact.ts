import {Contact} from "@/type";
import fetchContentful from "@/lib/contentful";

const GET_CONTACT_QUERY = `
  query GetContact($label: String!) {
    contactLinkCollection(where: {label_contains: $label}, limit: 1) {
      items {
        sys {
          id
        }
        label
        link
        icon {
          url
          title
        }
      }
    }
  }
`;

interface ContactsResponse {
    contactLinkCollection?: {
        items: Contact[]
    }
}

export const getContact = async (label: string): Promise<Contact | undefined | null> => {
    const variables: Record<string, string> = {label: label};
    const options = {revalidate: 3600, tags: ['contact', 'contacts']};
    const data = await fetchContentful<ContactsResponse>(GET_CONTACT_QUERY, variables, options);
    return data.contactLinkCollection?.items[0];
}