import Link from "next/link";
import { Card, Typography, Space } from "@supabase/ui";
import { supabase } from "../utils/initSupabase";
import { useQuery, gql, useApolloClient } from "@apollo/client";

import { GET_BARANGAYS } from "../lib/queries/getBarangays";
import { initializeApollo } from "../lib/apollo";

export default function Test({ user }) {
  const { loading, error, data } = useQuery(GET_BARANGAYS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "96px auto",
        backgroundColor: "white",
        padding: "4em",
        position: "relative",
        borderRadius: "10px",
      }}
    >
      {/* {user ? <div>User: {JSON.stringify(user)} </div> : "no user"} */}
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
      <img
        src={user.user_metadata.avatar_url}
        style={{ borderRadius: "100px", marginRight: '1em' }}
      />
      <span>{user.email}</span>
      </div>
      <ul>
        {data?.barangays.map((barangay) => (
          <li key={barangay.id}>{barangay.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_BARANGAYS,
  });

  // If there is a user, return it.
  return { props: { user, initialAppolloState: apolloClient.cache.extract() } };
}
