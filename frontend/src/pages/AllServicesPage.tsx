import ApiPage, { apiRequest } from '../components/ApiPage'
export default function AllServicesPage() {
  return <ApiPage title="Összes szolgáltatás" description="Minden szolgáltatás listázása kategórianévvel, alapár szerint növekvő sorrendben." method="GET" endpoint="GET /szolgaltatasok" run={() => apiRequest('/szolgaltatasok')} />
}
