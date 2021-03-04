import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { difference } from '../../helpers/helperFunctions';

export default function VolumeModal(props) {
  const rows = props.copyData.map((row) => {
    return (
      <tr key={row.Date}>
        <td>{row.Date}</td>
        <td>{row.Volume}</td>
        <td>{difference(row.High, row.Low)}</td>
      </tr>
    );
  })

  return (
    <Modal centered show={props.showVolume} onHide={() => props.setShowVolume(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Volumes and price changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Dates are ordered by volumes and price changes.</p>
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Volume</th>
              <th>Price Change</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}