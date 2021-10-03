import { Auth } from '@supabase/ui'
import { supabase } from '../utils/initSupabase'
import './../style.css'

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";


export default function MyApp({ Component, pageProps }) {
  
  const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <main className={"dark"}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Auth.UserContextProvider>
    </main>
  );
}
