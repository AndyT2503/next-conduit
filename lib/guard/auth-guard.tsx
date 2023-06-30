import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/app.store";

export function AuthGuard({ children }: React.PropsWithChildren<unknown>) {
  const router = useRouter();
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (s) => s.auth,
  );
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url: string) {
    const privatePath = ["/settings", "/editor"];
    if (!isAuthenticated && privatePath.some((path) => url.includes(path))) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  if (!authorized) {
    return <></>;
  } else {
    return children;
  }
}
