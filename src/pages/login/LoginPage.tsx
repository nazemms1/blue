import { Stack } from "@mantine/core";
import { useState } from "react";
import { LoginBrand } from "./ui/LoginBrand";
import { LoginForm } from "./ui/LoginForm";
import { TestAccountsPanel } from "./ui/TestAccountsPanel";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack gap="lg">
      <LoginBrand />

      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />

      <TestAccountsPanel
        onSelect={(e, p) => {
          setEmail(e);
          setPassword(p);
        }}
      />
    </Stack>
  );
}
