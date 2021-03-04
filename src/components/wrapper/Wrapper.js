import Sidebar from './Sidebar';
import DataTable from './DataTable';
import './Wrapper.css';

export default function Wrapper(props) {
  return (
    <div>
      <p className='info'>
        The dates of the currently loaded stock data range 
        from {<b>{props.dataDates.firstDate}</b>} to {<b>{props.dataDates.lastDate}</b>}.
        Select dates between this range to get statistics of the data.
      </p>
      <div className='wrapper'>
        <Sidebar 
          data={props.data} 
          selectedDates={props.selectedDates} 
          setSelectedDates={props.setSelectedDates} 
          dataDates={props.dataDates} 
          upwardTrend={props.upwardTrend} 
          priceChanges={props.priceChanges} 
          openingPrice={props.openingPrice} 
        />
        <DataTable data={props.data} />
      </div>
    </div>
  );
}
