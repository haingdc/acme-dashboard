import { Suspense } from "react";
import CardWrapper from '@/app/ui/dashboard/cards.tsx';
import RevenueChart from '@/app/ui/dashboard/revenue-chart.tsx';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices.tsx';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons.tsx";
// import { connection } from 'next/server'
 
export default async function Page() {
  // uncomment vì khi deploy tới Deno Deploy xảy ra lỗi 500 Server error
  // await connection()
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}