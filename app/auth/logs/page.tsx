import { redirect } from "next/navigation";

export const runtime = "nodejs";

export default function AuthLogsRedirect() {
  redirect("/auth/log");
}
