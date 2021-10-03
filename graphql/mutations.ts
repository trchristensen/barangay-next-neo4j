import { gql } from "@apollo/client";

export const CREATE_BARANGAY = gql`
  mutation createBarangay($id: ID!, $name: String!, $postal_code: String) {
    createBarangays(
      input: { id: $id, name: $name, postal_code: $postal_code }
    ) {
      barangays {
        id
        name
      }
      info {
        bookmark
        nodesCreated
        relationshipsCreated
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $id: ID!
    $username: String!
    $first_name: String!
    $last_name: String!
  ) {
    createUsers(
      input: {
        id: $id
        username: $username
        first_name: $first_name
        last_name: $last_name
      }
    ) {
      info {
        bookmark
        nodesCreated
        relationshipsCreated
      }
      users {
        id
        username
        first_name
        last_name
      }
    }
  }
`;

export const CREATE_SHOP_CONNECT_USER = gql`
  mutation createShopConnectUser(
    $id: ID!
    $name: String!
    $slug: String!
    $delivery: Boolean
    $address1: String
    $address2: String
    $phone: String
    $shop_type: ShopType
    $user_id: ID!
    $barangay_id: ID!
    $community_id: ID!
  ) {
    createShops(
      input: {
        id: $id
        name: $name
        slug: $slug
        delivery: $delivery
        address1: $address1
        address2: $address2
        phone: $phone
        shop_type: $shop_type
        owner: { connect: { where: { node: { id: $user_id } } } }
        barangay: { connect: { where: { node: { id: $barangay_id } } } }
        community: { connect: { where: { node: { id: $community_id } } } }
      }
    ) {
      shops {
        id
        name
      }
    }
  }
`;
