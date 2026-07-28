import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AppShellLayout } from "@app/layouts";
import { AuthLayout } from "@app/layouts";
import { ProtectedRoute, PermissionRoute } from "./ProtectedRoute";
import { LoadingOverlay } from "@shared/ui";

import { LoginPage } from "@pages/login";
import { SelectModulePage } from "@pages/select-module";
import { cmsRoutes } from "@modules/cms";
import { userSettingsRoutes } from "@modules/user-settings";
import { AppErrorFallback } from "@app/ui/AppErrorFallback";
import {
  BillingDashboardPage,
  BillingListPage,
  BillingEditorPage,
  BillingDepartmentsPage,
  BillingUsersPage,
  BillingClientsPage,
  BillingReportsPage,
  BillingPaymentPage,
  BillingDetailsPage,
} from "@modules/billing/pages";

// eslint-disable-next-line react-refresh/only-export-components
const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingOverlay fullPage />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    errorElement: <AppErrorFallback />,
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
    errorElement: <AppErrorFallback />,
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

      ...cmsRoutes,

      ...userSettingsRoutes,

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
      {
        path: "billing/payment",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingPaymentPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "billing/:type/:id/view",
        element: (
          <PermissionRoute permission="billing">
            <S>
              <BillingDetailsPage />
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
