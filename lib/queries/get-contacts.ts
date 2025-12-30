import {Contact} from "@/type";
import fetchContentful from "@/lib/contentful";

const GET_CONTACTS_QUERY = `
  query GetContacts {
    contactLinkCollection(order: sys_firstPublishedAt_ASC) {
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
    contactLinkCollection: {
        items: Contact[]
    }
}

export const getContacts = async (): Promise<Contact[]> => {
    const options = {revalidate: 3600, tags: ['contacts']};
    const data = await fetchContentful<ContactsResponse>(GET_CONTACTS_QUERY, {}, options);
    return data.contactLinkCollection.items;
}