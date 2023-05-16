import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store, TSSProvider } from "../providers/TSSProvider";
import Container from '../components/Container';
import Welcome from "../routes/welcome";
import CompaniesIndex from "../routes/companies-index";
import CompaniesShow from "../routes/companies-show";
import ErrorPage from "../routes/error-page";
import HowTSSWorks from "../routes/how-tss-works";
import RequestCopy from "../routes/request-copy";
import RequestCopyNew from "../routes/request-copy-new";
import RequestCopyResult from "../routes/request-copy-result";
import RequestCopyCustom from "../routes/request-copy-custom";
import SubmissionsRetrieve from "../routes/submissions-retrieve";
import RetrieveSubmissionResult from "../routes/retrieve-submission-result";
import Submissions from '../routes/submissions';
import SubmissionsNew from "../routes/submissions-new";
import ConfirmEmail from "../routes/confirm-email";
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
    loader: async ({ request, params }) => {
      const response = await fetch(`/api/companies/how_tss_works.json`);
      const responseJson = await response.json();
      return responseJson;
    },
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
    path: "/confirm-email/:token",
    element: <ConfirmEmail />,
    loader: async ({ request, params }) => {
      const response = await fetch(`/api/confirm-email/${params.token}`);
      const responseJson = await response.json();
      return { responseJson };
    },
    errorElement: <ErrorPage />
  },
  {
    path: "/retrieve-submission/:token",
    element: <RetrieveSubmissionResult />,
    loader: async ({ request, params }) => {
      const response = await fetch(`/api/submissions/retrieve_result/${params.token}`);
      const responseJson = await response.json();
      return { responseJson };
    },
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
    path: "/request-copy/companies/:id",
    element: <RequestCopyResult />,
    loader: async ({ request, params }) => {
      const response = await fetch(`/api/companies/${params.id}/request-copy.json`);
      const result = await response.json();
      return result;
    
    },
    errorElement: <ErrorPage />
  },
  {
    path: "/request-copy/custom-form/:companyname",
    element: <RequestCopyCustom />,
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
    loader: async ({ request, params }) => {
      const response = await fetch(`/api/companies.json?mode=full`);
      const response_json = await response.json();
      return response_json;
    },
    errorElement: <ErrorPage />
  },
  {
    path: "/companies/:id",
    element: <CompaniesShow />,
    loader: async ({ request, params }) => {
      const response = await fetch(`/api/companies/${params.id}.json`);
      const response_json = await response.json();
      return response_json;
    },
    errorElement: <ErrorPage />
  }
]);


const theme = extendTheme({
  fontFamily: {
    body: 'Sohne, sans-serif',
  },
  components: {
    JoySelect: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'primary' && {
            color: "#202B62",
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
    JoyTextarea: {
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
              backgroundColor: "#eceef3",
              color: "#d1d4df"
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
  