import Table from 'react-bootstrap/Table';
import './DataTable.css';

export default function DataTable(props) {
  const columns = props.data.meta.fields.map((name) => {
    return (
      <th key={name}>{name}</th>
    );
  })

  const rows = props.data.data.map((row) => {
    return (
      <tr key={row.Date}>
        <td>{row.Date}</td>
        <td>{row.CloseLast}</td>
        <td>{row.Volume}</td>
        <td>{row.Open}</td>
        <td>{row.High}</td>
        <td>{row.Low}</td>
      </tr>
    );
  })

  return (
    <div className='data-table'>
      <Table striped hover>
        <thead>
          <tr>
            { columns }
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </Table>
    </div>
  );
}