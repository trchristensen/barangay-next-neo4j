import { gql } from '@apollo/client';

export const GET_SHOPS_BY_COMMUNITY = gql`
  {
    shops(options: { sort: { name: ASC }, limit: 20 }) {
      id
      name
      slug
      delivery
      shop_type
      created
      owner {
        username
        avatar
      }
    }
  }
`;


export const GET_SHOPS_BY_BARANGAY = gql`
  query getShopsByBarangay(
    $barangay_id: ID!
    $limit: Int
    $sort_direction: SortDirection
  ) {
    shops(
      where: { barangay: { id: $barangay_id } }
      options: { sort: { name: $sort_direction }, limit: $limit }
    ) {
      id
      name
      slug
      delivery
      shop_type
      created
      owner {
        username
        avatar
      }
    }
  }
`;

// export const GET_USER_SHOPS = gql`

// `;
