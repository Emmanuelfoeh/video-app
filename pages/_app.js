import Loading from '@/components/Loading/Loading';
import { magic } from '@/lib/magic-client';
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
   const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        // route to /
        router.push("/");
      } else {
        // route to /login
        router.push("/Login");
      }
    };
    handleLoggedIn();
  }, []);

   useEffect(() => {
     const handleComplete = () => {
       setIsLoading(false);
     };
     router.events.on("routeChangeComplete", handleComplete);
     router.events.on("routeChangeError", handleComplete);

     return () => {
       router.events.off("routeChangeComplete", handleComplete);
       router.events.off("routeChangeError", handleComplete);
     };
   }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}
