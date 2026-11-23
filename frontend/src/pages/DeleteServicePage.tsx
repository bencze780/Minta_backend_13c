import ApiPage, { apiRequest } from '../components/ApiPage'
export default function DeleteServicePage() {
  return <ApiPage title="Szolgáltatás törlése" description="Szolgáltatás törlése azonosító alapján. A művelet előtt megerősítést kérünk." method="DELETE" endpoint="DELETE /szolgaltatasok/:id" input="id" inputLabel="Törlendő szolgáltatás azonosítója" inputPlaceholder="Például: 1" confirmDelete run={id => apiRequest(`/szolgaltatasok/${encodeURIComponent(id)}`, 'DELETE')} />
}
