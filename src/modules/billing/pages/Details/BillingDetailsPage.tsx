import { useParams } from "react-router-dom";
import { BillingDetailsWidget } from "../../widgets/BillingDetailsWidget";

export function BillingDetailsPage() {
  const { type, id } = useParams<{ type: string; id: string }>();

  return <BillingDetailsWidget type={type} id={id} />;
}
