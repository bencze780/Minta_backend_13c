import ApiPage, { apiRequest } from '../components/ApiPage'
const example = `{
  "kategoria_id": 1,
  "megnevezes": "Módosított szolgáltatás",
  "alapar": 15000,
  "munkaido_perc": 45,
  "aktiv": 1
}`
export default function UpdateServicePage() {
  return <ApiPage title="Szolgáltatás módosítása" description="A teljes rekord módosítása azonosító alapján (PUT)." method="PUT" endpoint="PUT /szolgaltatasok/:id" input="id-json" inputLabel="Szolgáltatás azonosítója" inputPlaceholder="Például: 1" jsonPlaceholder={example} run={(id, json) => apiRequest(`/szolgaltatasok/${encodeURIComponent(id)}`, 'PUT', JSON.parse(json))} />
}
