import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AppShellLayout } from "@app/layouts";
import { AuthLayout } from "@app/layouts";
import { ProtectedRoute, PermissionRoute } from "./ProtectedRoute";
import { LoadingOverlay } from "@shared/ui";

// Top-level pages (lazy via their slice barrel)
import { LoginPage } from "@pages/login";
import { SelectModulePage } from "@pages/select-module";

// Module pages (lazy via each module's pages barrel)
import {
  MediaDashboardPage,
  MediaListPage,
  MediaUploadPage,
} from "@modules/media/pages";
import {
  ContentDashboardPage,
  ContentListPage,
  ContentEditorPage,
} from "@modules/content/pages";

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
        path: "content",
        element: (
          <PermissionRoute permission="content">
            <S>
              <ContentDashboardPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "content/articles",
        element: (
          <PermissionRoute permission="content">
            <S>
              <ContentListPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "content/articles/new",
        element: (
          <PermissionRoute permission="content">
            <S>
              <ContentEditorPage />
            </S>
          </PermissionRoute>
        ),
      },
      {
        path: "content/articles/:id/edit",
        element: (
          <PermissionRoute permission="content">
            <S>
              <ContentEditorPage />
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
