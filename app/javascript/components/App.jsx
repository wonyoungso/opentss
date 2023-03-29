import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store, TSSProvider } from "../providers/TSSProvider";
import Container from '../components/Container';
import Welcome from "../routes/welcome";
import CompaniesIndex from "../routes/companies-index";
import ErrorPage from "../routes/error-page";
import HowTSSWorks from "../routes/how-tss-works";
import RequestCopy from "../routes/request-copy";
import SubmissionsIndex from "../routes/submissions-index";
import SubmissionsNew from '../routes/submissions-new';
import About from '../routes/about';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/how-tss-works",
    element: <HowTSSWorks />,
    // with this data loaded before rendering
    //  loader: async ({ request, params }) => {
    //   return fetch(
    //     `/fake/api/teams/${params.teamId}.json`,
    //     { signal: request.signal }
    //   );
    // },
    errorElement: <ErrorPage />
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />
  },
  {
    path: "/request-copy",
    element: <RequestCopy />,
    errorElement: <ErrorPage />
  },
  {
    path: "/submissions/new",
    element: <SubmissionsNew />,
    errorElement: <ErrorPage />
  },
  {
    path: "/submissions",
    element: <SubmissionsIndex />,
    errorElement: <ErrorPage />
  },
  {
    path: "/companies",
    element: <CompaniesIndex />,
    // with this data loaded before rendering
    //  loader: async ({ request, params }) => {
    //   return fetch(
    //     `/fake/api/teams/${params.teamId}.json`,
    //     { signal: request.signal }
    //   );
    // },
    errorElement: <ErrorPage />
  }
]);


const App = () => {
  return (
    <React.StrictMode>
      <TSSProvider>
        <Container>
          <RouterProvider router={router} />
        </Container>
      </TSSProvider>
    </React.StrictMode>
  )
};

export default App;
