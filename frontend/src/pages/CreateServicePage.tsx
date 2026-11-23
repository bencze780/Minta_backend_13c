import ApiPage, { apiRequest } from '../components/ApiPage'
const example = `{
  "kategoria_id": 1,
  "megnevezes": "Próba szolgáltatás",
  "alapar": 12000,
  "munkaido_perc": 30,
  "aktiv": 1
}`
export default function CreateServicePage() {
  return <ApiPage title="Új szolgáltatás létrehozása" description="Új rekord felvétele a szolgáltatások táblába." method="POST" endpoint="POST /szolgaltatasok" input="json" inputLabel="Új szolgáltatás adatai (JSON)" jsonPlaceholder={example} run={value => apiRequest('/szolgaltatasok', 'POST', JSON.parse(value))} />
}
