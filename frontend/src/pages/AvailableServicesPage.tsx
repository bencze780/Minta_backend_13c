import ApiPage, { apiRequest } from '../components/ApiPage'
export default function AvailableServicesPage() {
  return <ApiPage title="Elérhető szolgáltatások" description="Az aktív, legfeljebb 60 perces munkaidejű szolgáltatások listája." method="GET" endpoint="GET /szolgaltatasok/elerheto" run={() => apiRequest('/szolgaltatasok/elerheto')} />
}
