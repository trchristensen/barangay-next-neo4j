import { gql } from "@apollo/client";

export const GET_BARANGAYS = gql`
  {
    barangays {
      id
      name
    }
  }
`;