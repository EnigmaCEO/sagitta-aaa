import { Suspense } from "react";
import type { Metadata } from "next";
import MarketingPageClient from "./MarketingPageClient";
import {
  StructuredData,
  ORGANIZATION_SCHEMA,
  SOFTWARE_APPLICATION_SCHEMA,
} from "../components/StructuredData";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Sagitta AAA — Policy-Driven Allocation Intelligence for Crypto Institutions",
  description:
    "Sagitta AAA is a policy-driven, non-custodial allocation and risk engine for DAOs, crypto portfolio managers, and treasury operators. Deterministic, audit-ready allocation decision intelligence.",
  alternates: { canonical: "https://aaa.sagitta.systems/" },
};

export default function Page() {
  return (
    <>
      <StructuredData data={[ORGANIZATION_SCHEMA, SOFTWARE_APPLICATION_SCHEMA]} />
      <Suspense fallback={null}>
        <MarketingPageClient />
      </Suspense>
    </>
  );
}
