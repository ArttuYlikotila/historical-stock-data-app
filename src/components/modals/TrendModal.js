import Modal from 'react-bootstrap/Modal';
import { dateStringConversion } from '../../helpers/helperFunctions';

export default function TrendModal(props) {
  return (
    <Modal centered show={props.showTrend} onHide={() => props.setShowTrend(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Longest Bullish Trend</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Longest bullish trend of Close/Last price 
          was {<strong>{props.bullishTrend}</strong>} days in a row 
          between {dateStringConversion(props.selectedDates.startDate, '-')} and {dateStringConversion(props.selectedDates.endDate, '-')}.
        </p>
      </Modal.Body>
    </Modal>
  );
}