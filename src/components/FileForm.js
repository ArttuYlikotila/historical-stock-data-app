import Form from 'react-bootstrap/Form';
import Papa from 'papaparse';
import './FileForm.css';

export default function FileForm(props) {
  // Read the input file, parse the contents and set the states of the App
  function handleFileLoad(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const parsedData = parseData(event.target.result.trim());
      setAppStates(parsedData);
    }
    reader.readAsText(file);
    props.setIsLoading(true);
    props.setIsFileSelected(true);
  }

  // Parse the CSV-data from the input file to JSON
  function parseData(csvData) {
    const parsedData = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      transformHeader: function(column) {
        if (column === 'Close/Last') {
          return 'CloseLast';
        }  
        return column.trim();
      }
    });

    return parsedData;
  }

  // Set states of the App according to the success of parsing
  function setAppStates(parsedData) {
    if (parsedData.errors.length === 0) {
      // Trim, slice and type the parsed data for easier later use
      parsedData.data.forEach((row) => {
        row.Date = row.Date.trim();
        row.CloseLast = parseFloat(row.CloseLast.trim().slice(1));
        row.Open = parseFloat(row.Open.trim().slice(1));
        row.High = parseFloat(row.High.trim().slice(1));
        row.Low = parseFloat(row.Low.trim().slice(1));
      });

      props.setData(parsedData);
      props.setDataDates({
        ...props.dataDates, 
        firstDate: parsedData.data[parsedData.data.length-1].Date, 
        lastDate: parsedData.data[0].Date
      });
      props.setIsLoading(false);
    }
    else {
      props.setError(parsedData.errors);
      props.setIsFileSelected(false);
      props.setIsLoading(false);
    }
  }

  return (
    <div className='wrap'>
      <p>
        Download first a CSV-file containing historical stock data from
        the website of <a href='https://www.nasdaq.com/market-activity/stocks'>Nasdaq</a> to your 
        device. Then, import the downloaded CSV-file to this app.
      </p>
      <p>
        For example, historical stock data of Apple Inc. can be  
        found <a href='https://www.nasdaq.com/market-activity/stocks/aapl/historical'>here</a>.
      </p>
      <Form className='fileInput'>
        <Form.File 
          id='csv-file' 
          label='Import CSV-file' 
          custom
          accept='.csv'
          onChange={e => handleFileLoad(e.target.files[0])} />
      </Form>
      <p>
        NOTE: Use only CSV-files downloaded from Nasdaq website.
      </p>
    </div>
  );
}
