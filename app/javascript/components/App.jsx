import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store, TSSProvider } from "../providers/TSSProvider";
import Welcome from "../routes/welcome";
import CompaniesIndex from "../routes/companies-index";
import ErrorPage from "../routes/error-page";
import Container from '../components/Container'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tss-companies",
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
