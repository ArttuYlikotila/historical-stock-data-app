import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './Modal.css';

export default function OpeningPriceModal(props) {
  const rows = props.copyData.map((row) => {
    return (
      <React.Fragment key={row.Date}>
        { // Return only rows that have the attribute "change"
          row.change ?
            <tr>
              <td>{row.Date}</td>
              <td className={row.change > 0 ? 'positive' : 'negative' }>{row.change} %</td>
            </tr> 
          : null }
      </React.Fragment>
    );
  })

  return (
    <Modal centered show={props.showOpeningPrice} onHide={() => props.setShowOpeningPrice(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Changes in opening prices compared to SMA 5 of closing prices.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Dates are ordered by the price change percentage.</p>
        <p>
          NOTE: First five days of the selected range are not included due to not  
          having the SMA 5 for those days.
        </p>
        { // If selected data range is wide enough, render table with data, otherwise render message
          props.copyData.length > 5 ?
            <Table striped>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price Change Percentage</th>
                </tr>
              </thead>
              <tbody>
                { rows }
              </tbody>
            </Table>
          : <strong>Please select wider date range.</strong> }
      </Modal.Body>
    </Modal>
  );
}