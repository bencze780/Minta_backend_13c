import ApiPage, { apiRequest } from '../components/ApiPage'
export default function SearchServicesPage() {
  return <ApiPage title="Keresés megnevezés szerint" description="Részletkeresés a szolgáltatás megnevezésében." method="GET" endpoint="GET /szolgaltatasok/kereses/:szoveg" input="text" inputLabel="Keresett szöveg" inputPlaceholder="Például: fék" run={value => apiRequest(`/szolgaltatasok/kereses/${encodeURIComponent(value)}`)} />
}
