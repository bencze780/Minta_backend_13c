import ApiPage, { apiRequest } from '../components/ApiPage'
export default function CategoryStatsPage() {
  return <ApiPage title="Kategória-statisztika" description="Kategóriánkénti szolgáltatásszám és átlagos alapár." method="GET" endpoint="GET /kategoriak/statisztika" run={() => apiRequest('/kategoriak/statisztika')} />
}
