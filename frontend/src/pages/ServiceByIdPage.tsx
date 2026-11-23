import ApiPage, { apiRequest } from '../components/ApiPage'
export default function ServiceByIdPage() {
  return <ApiPage title="Szolgáltatás lekérdezése" description="Egyetlen szolgáltatás megjelenítése azonosító alapján." method="GET" endpoint="GET /szolgaltatasok/:id" input="id" inputLabel="Szolgáltatás azonosítója" inputPlaceholder="Például: 1" run={value => apiRequest(`/szolgaltatasok/${encodeURIComponent(value)}`)} />
}
