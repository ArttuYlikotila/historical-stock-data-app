import React, { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { dateStringConversion } from '../../helpers/helperFunctions';
import './DateForm.css';

// TODO date input with Safari should be taken into consideration due to browser differences
export default function DateForm(props) {
  const [showToast, setShowToast] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    // Convert the date string to correct format and try to find the date from the data
    const day = dateStringConversion(value, '-');
    const dayIndex = props.data.data.findIndex(row => row.Date === day);
    
    // Show toast if date is not found, otherwise set the parents state to input date
    if (dayIndex < 0) {
      setShowToast(true);
    }
    else {
      props.setSelectedDates({...props.selectedDates, [name]: value});
    }
  }

  function clearDates() {
    props.setSelectedDates({...props.selectedDates, startDate: '', endDate: '' });
  }

  // Form limits the users choice of dates so that invalid date range cannot be chosen
  return (
    <Form>
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control 
          type="date" 
          name='startDate' 
          required 
          min={dateStringConversion(props.dataDates.firstDate, '/')}
          max={props.selectedDates.endDate || dateStringConversion(props.dataDates.lastDate, '/')}
          value={props.selectedDates.startDate} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control 
          type="date" 
          name='endDate' 
          required
          min={props.selectedDates.startDate}
          max={dateStringConversion(props.dataDates.lastDate, '/')}
          value={props.selectedDates.endDate} 
          onChange={handleChange} 
        />
      </Form.Group>

      <Button variant='dark' onClick={clearDates}>Clear dates</Button>
      
      <Toast 
        className='text-danger'
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide animation={false}
      >
        <Toast.Header>
          <strong className='m-auto text-danger'>Date is not found in data</strong>
          </Toast.Header>
        <Toast.Body>Choose some other date.</Toast.Body>
      </Toast>
    </Form>
  );
}
