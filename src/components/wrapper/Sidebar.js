import DateForm from './DateForm';
import Button from 'react-bootstrap/Button';
import './Sidebar.css';

export default function Sidebar(props) {
  return (
    <div className='sidebar'>
      <DateForm 
        data={props.data} 
        selectedDates={props.selectedDates} 
        setSelectedDates={props.setSelectedDates} 
        dataDates={props.dataDates} 
      />
      { // Render buttons for available features only if both dates have been selected
        props.selectedDates.startDate && props.selectedDates.endDate ?
          <div className='features'>
            <p>Available features:</p>
            <Button variant='dark' onClick={props.upwardTrend}>Longest bullish trend</Button>
            <Button variant='dark' onClick={props.priceChanges}>Volumes and price changes</Button>
            <Button variant='dark' onClick={props.openingPrice}>Best opening prices</Button>
          </div>
        : null }
    </div>
  );
}