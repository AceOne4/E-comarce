import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageSuspense from "@components/feedBack/pageSuspense/PageSuspense";
//we use lazy to make the whole app load step by step which mean only the neccessary components will render first
//Pages
import ErrorElment from "@pages/ErrorElment";

import ProtectedRoutes from "@components/common/auth/ProtectedRoutes";
const Home = lazy(() => import("@pages/Home"));
const WhishList = lazy(() => import("@pages/WhishList"));
const Categories = lazy(() => import("@pages/Categories"));
const ShoppingCart = lazy(() => import("@pages/ShoppingCart"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const LogIn = lazy(() => import("@pages/LogIn"));
const SignUp = lazy(() => import("@pages/SignUp"));
const Orders = lazy(() => import("@pages/Orders"));
const Account = lazy(() => import("@pages/Account"));

//Main LayOut
const MainLayOut = lazy(() => import("@layouts/MainLayout/mainLayOut"));
const ProfileLayout = lazy(
  () => import("@layouts/ProfileLayout/ProfileLayout")
);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback="loading please wait..">
        <MainLayOut />
      </Suspense>
    ),
    errorElement: <ErrorElment />,
    children: [
      {
        index: true,
        element: (
          <PageSuspense>
            <Home />
          </PageSuspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSuspense>
            <ShoppingCart />
          </PageSuspense>
        ),
      },
      {
        path: "/whishlist",
        element: (
          <ProtectedRoutes>
            <PageSuspense>
              <WhishList />
            </PageSuspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspense>
            <Categories />
          </PageSuspense>
        ),
      },
      {
        path: "products/:prefix",
        element: (
          <PageSuspense>
            <Products />
          </PageSuspense>
        ),
        loader: ({ params }) => {
          /* typeof params.prefix !== "string"
                This a Ts Guard
            */
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found ",
              status: 400,
            });
          }

          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <PageSuspense>
            <AboutUs />
          </PageSuspense>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspense>
            <LogIn />
          </PageSuspense>
        ),
      },
      {
        path: "signup",
        element: (
          <PageSuspense>
            <SignUp />
          </PageSuspense>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <PageSuspense>
              <ProfileLayout />
            </PageSuspense>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspense>
                <Account />
              </PageSuspense>
            ),
          },
          {
            path: "orders",
            element: (
              <PageSuspense>
                <Orders />
              </PageSuspense>
            ),
          },
        ],
      },
    ],
  },
]);
function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
