import { useState, type FormEvent, type ReactNode } from 'react'
import { apiRequest } from '../api/client'
import DataTable from './DataTable'
import './ApiPage.css'

type Row = Record<string, unknown>
type InputKind = 'none' | 'text' | 'id' | 'json' | 'id-json'

function normalizeRows(data: unknown): Row[] {
  if (Array.isArray(data)) return data as Row[]
  if (data && typeof data === 'object') return [data as Row]
  return [{ eredmeny: data ?? 'Nincs adat' }]
}

type Props = {
  title: string
  description: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  input?: InputKind
  inputLabel?: string
  inputPlaceholder?: string
  jsonPlaceholder?: string
  run: (value: string, jsonValue: string) => Promise<unknown>
  children?: ReactNode
  confirmDelete?: boolean
}

export default function ApiPage({
  title, description, method, endpoint, input = 'none',
  inputLabel = 'Adat', inputPlaceholder = '', jsonPlaceholder = '',
  run, children, confirmDelete = false
}: Props) {
  const [value, setValue] = useState('')
  const [jsonValue, setJsonValue] = useState('')
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(''); setSuccess(''); setRows([])
    if ((input === 'text' || input === 'id' || input === 'id-json') && !value.trim()) {
      setError('A mező kitöltése kötelező.')
      return
    }
    if ((input === 'json' || input === 'id-json') && !jsonValue.trim()) {
      setError('A JSON adatok megadása kötelező.')
      return
    }
    if (confirmDelete && !window.confirm('Biztosan törölni szeretnéd ezt a szolgáltatást?')) return

    setLoading(true)
    try {
      const result = await run(value.trim(), jsonValue.trim())
      const resultRows = normalizeRows(result)
      setRows(resultRows)
      if (result && typeof result === 'object' && !Array.isArray(result)) {
        const response = result as Record<string, unknown>
        setSuccess(String(response.uzenet || 'A művelet sikeresen lefutott.'))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="api-page">
      <header className="page-heading">
        <div><span className="page-kicker">SZERVIZ API / {method}</span><h1>{title}</h1><p>{description}</p></div>
        <span className={`http-badge http-${method.toLowerCase()}`}>{method}</span>
      </header>

      <section className="api-panel">
        <div className="endpoint-row"><span className="endpoint-label">VÉGPONT</span><code>{endpoint}</code></div>
        {children}
        <form onSubmit={handleSubmit} className="api-form">
          {(input === 'text' || input === 'id' || input === 'id-json') && (
            <label className="field-label">{inputLabel}
              <input value={value} onChange={event => setValue(event.target.value)} placeholder={inputPlaceholder} />
            </label>
          )}
          {(input === 'json' || input === 'id-json') && (
            <label className="field-label">{input === 'json' ? inputLabel : 'Teljes módosítandó rekord (JSON)'}
              <textarea value={jsonValue} onChange={event => setJsonValue(event.target.value)} rows={8}
                spellCheck={false} placeholder={jsonPlaceholder} />
            </label>
          )}
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? 'Feldolgozás…' : method === 'GET' ? 'Lekérdezés indítása' : 'Művelet végrehajtása'}
          </button>
        </form>
      </section>

      <section className="result-panel">
        <div className="result-heading"><div><span className="page-kicker">VÁLASZ</span><h2>Eredmény</h2></div>
          {rows.length > 0 && <span className="row-count">{rows.length} rekord</span>}
        </div>
        {error && <div className="feedback feedback-error" role="alert">{error}</div>}
        {success && <div className="feedback feedback-success" role="status">{success}</div>}
        {rows.length > 0 ? <DataTable rows={rows} /> :
          !error && !success ? <div className="result-placeholder">A végpont válasza itt jelenik meg táblázatos formában.</div> : null}
      </section>
    </div>
  )
}

export { apiRequest }
