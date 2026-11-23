import ApiPage, { apiRequest } from '../components/ApiPage'
export default function ExpensiveServicesPage() {
  return <ApiPage title="Drága szolgáltatások" description="A 25 000 Ft feletti szolgáltatások, munkaidő szerint csökkenő sorrendben." method="GET" endpoint="GET /szolgaltatasok/dragak" run={() => apiRequest('/szolgaltatasok/dragak')} />
}
