import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getCamperById } from "@/lib/api/camperDetails";
import CamperDetailsClient from "@/components/CamperDetailsClient/CamperDetailsClient";
type Props = {
    params: Promise<{ id: string }>
}
export default async function CardDetails({params}: Props){
    const {id} = await params;
    const queryClient = new QueryClient();

await queryClient.prefetchQuery({
    queryKey: ['camper', id],
    queryFn: ()=>getCamperById(id)
})
return (
  <section className="section">
    <div className="container">
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient/>
    </HydrationBoundary>
    </div>
    </section>
  );
}