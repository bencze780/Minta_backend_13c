/// <reference types="vite/client" />

import './DataTable.css'

type DataRow = Record<string, unknown>

function displayValue(value: unknown): string {
  if (value === null) return 'NULL'
  if (value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export default function DataTable({ rows }: { rows: DataRow[] }) {
  if (rows.length === 0) return <div className="table-empty">A lekérdezés nem adott vissza rekordot.</div>
  const columns = [...new Set(rows.flatMap(row => Object.keys(row)))]
  return (
    <div className="data-table-scroll">
      <table className="data-table">
        <thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => (
          <tr key={index}>{columns.map(column => <td key={column}>{displayValue(row[column])}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
  )
}
