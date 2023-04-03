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
import RequestCopyNew from "../routes/request-copy-new";
import RequestCopyResult from "../routes/request-copy-result";
import SubmissionsRetrieve from "../routes/submissions-retrieve";
import Submissions from '../routes/submissions';
import SubmissionsNew from "../routes/submissions-new";
import About from '../routes/about';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/how-tss-works",
    element: <HowTSSWorks />,
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
    path: "/request-copy/new",
    element: <RequestCopyNew />,
    loader: async ({ request, params }) => {
      const response = await fetch(`/api/companies.json`);
      const companies = await response.json();
      return { companies };
    },
    errorElement: <ErrorPage />
  },
  {
    path: "/request-copy/:type/:arg",
    element: <RequestCopyResult />,
    loader: async ({ request, params }) => {
      if (params.type === "companies") {
        const response = await fetch(`/api/companies/${params.arg}/request-copy.json`);
        const result = await response.json();
        return result;
      } else {
        return {};
      }

    },
    errorElement: <ErrorPage />
  },
  {
    path: "/submissions",
    element: <Submissions />,
    errorElement: <ErrorPage />
  },
  {
    path: "/submissions/new",
    element: <SubmissionsNew />,
    errorElement: <ErrorPage />
  },
  {
    path: "/submissions/retrieve",
    element: <SubmissionsRetrieve />,
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


const theme = extendTheme({
  fontFamily: {
    body: 'Sohne, sans-serif',
  },
  components: {
    JoyRadio: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            outlineColor: "#202B62",
            borderColor: "#202B6222",
            "&:checked": {
              color: "#202B62"
            },
            "&:disabled":{
              backgroundColor: "#DDDDDD",
            }
          }),
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            color: "#202B62",
            backgroundColor: "#FFFFFF",
            borderColor: "#202B6222",
            "&:disabled":{
              backgroundColor: "#DDDDDD",
            },
            "&:hover": {
              backgroundColor: "#FFFFFF",
            }
          }),
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            color: "#202B62",
            backgroundColor: "#202B6222",
            borderColor: "#202B6222",
            "&:disabled":{
              backgroundColor: "#DDDDDD",
            },
            "&:hover": {
              backgroundColor: "#202B6222",
            }
          }),
        }),
      },
    },
  },
});


const App = () => {
  return (
    <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <TSSProvider>
          <Container>
            <RouterProvider router={router} />
          </Container>
        </TSSProvider>
      </CssVarsProvider>
    </React.StrictMode>
  )
};

export default App;
  