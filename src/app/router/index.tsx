import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AppShellLayout } from "@app/layouts";
import { AuthLayout } from "@app/layouts";
import { ProtectedRoute, PermissionRoute } from "./ProtectedRoute";
import { LoadingOverlay } from "@shared/ui";

 import { LoginPage } from "@pages/login";
import { SelectModulePage } from "@pages/select-module";

 import {
  MediaDashboardPage,
  MediaListPage,
  MediaUploadPage,
} from "@modules/media/pages";
import {
  BillingDashboardPage,
  BillingListPage,
  BillingEditorPage,
  BillingDepartmentsPage,
  BillingUsersPage,
  BillingClientsPage,
  BillingReportsPage,
} from "@modules/billing/pages";

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingOverlay fullPage />}>{children}</Suspense>
);

export const router = createBrowserRouter([
   {
    path: "/login",
    element: (
      <AuthLayout>
        <S>
          <LoginPage />
        </S>
      </AuthLayout>
    ),
  },

   {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShellLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/select-module" replace />,
      },
      {
        path: "select-module",
        element: (
          <S>
            <SelectModulePage />
          </S>
        ),
      },

       {
        path: "media",
        element: (
          <PermissionRoute permission="media">
            <S>
              <MediaDashboardPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "media/library",
        element: (
          <PermissionRoute permission="media">
            <S>
              <MediaListPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "media/upload",
        element: (
          <PermissionRoute permission="media">
            <S>
              <MediaUploadPage />
            </S>
          </PermissionRoute>
        ),
      },

      {
        path: "billing",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingDashboardPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/articles",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingListPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/articles/new",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingEditorPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/articles/:id/edit",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingEditorPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/departments",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingDepartmentsPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/users",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingUsersPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/clients",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingClientsPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/reports",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingReportsPage />
            </S>
          </PermissionRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
