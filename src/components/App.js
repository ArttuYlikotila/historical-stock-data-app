import React, { useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import Header from './Header';
import FileForm from './FileForm';
import Wrapper from './wrapper/Wrapper';
import TrendModal from './modals/TrendModal';
import VolumeModal from './modals/VolumeModal';
import OpeningPriceModal from './modals/OpeningPriceModal';
import { extractDateRange, difference } from '../helpers/helperFunctions';
import './App.css';

export default function App() {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [error, setError] = useState(null);
  const [showTrend, setShowTrend] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showOpeningPrice, setShowOpeningPrice] = useState(false);
  const [bullishTrend, setBullishTrend] = useState('');
  const [dataDates, setDataDates] = useState({
    firstDate: '',
    lastDate: '',
  });
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: '',
  });

  // Function that counts the longest bullish trend and opens a modal containing that data
  function upwardTrend() {
    // Extract the wanted range from data and reverse the order of data for more sane traversal
    const range = extractDateRange(data.data, selectedDates);
    range.reverse();

    // Counters for the bullish trend
    let longestStreak = 0;
    let currentStreak = 0;

    // Loop the range to find out the longest bullish trend
    for (let i = 0; i < range.length; i++) {
      if (i > 0) {
        if (range[i].CloseLast > range[i-1].CloseLast) {
          currentStreak++;

          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
        }
        else {
          currentStreak = 0;
        }
      }
    }
    
    setBullishTrend(longestStreak);
    setShowTrend(true);
  }

  // Function that sorts the data with volumes and price changes and opens a modal containing that data
  function priceChanges() {
    // Extract the wanted range from data
    const range = extractDateRange(data.data, selectedDates);

    // Sort the data by volume and price changes in descending order
    range.sort(function(a, b) {
      let volume = a.Volume - b.Volume;
      let priceChange = difference(a.High, a.Low) - difference(b.High, b.Low);
      return -volume || -priceChange;
    });

    setCopyData(range);
    setShowVolume(true);
  }

  // Function that calculates the best opening prices and opens a modal containing that data
  function openingPrice() {
    // Extract the wanted range from data and reverse the order of data for more sane traversal
    const range = extractDateRange(data.data, selectedDates);
    range.reverse();

    // Calculate SMA 5 for dates and the price change percentage of opening price and SMA 5
    // NOTE: start from index 5 to be able to calculate SMA 5
    for (let i = 5; i < range.length; i++) {
      let sum = 0;
 
      // Sum the previous i-1...i-5 closing prices of current i for calculating the SMA 5
      for (let j = 1; j < 6; j++) {
        sum = sum + range[i-j].CloseLast
      };

      // SMA 5 for current i
      const sma = sum / 5;

      // Calculate the percentage change between opening price and SMA 5 of closing prices
      const change = (range[i].Open - sma) / Math.abs(sma) * 100;
      
      // Percentage difference could be calculated like below
      //const diff = (Math.abs(range[i].Open - sma)) / ((range[i].Open + sma) / 2) * 100;

      // Add the change percentage to data object rounded to two decimals and converted to a number
      range[i].change = +change.toFixed(2);
    };

    // Sort the data by price change percentage in descending order
    range.sort(function(a, b) {
      const changePercentage = a.change - b.change;
      return -changePercentage;
    });

    setCopyData(range);
    setShowOpeningPrice(true);
  }

  // Render an error message if there is errors with loading the file
  if (error) {
    return (
      <Alert variant='danger'>
        <Alert.Heading>Oops... There was an error with loading the file.</Alert.Heading>
        <p>Please reload the page and try to load different file.</p>
      </Alert>
    );
  }

  return (
    <div className="App">
      <Header />
      { // Render fileform if file is not yet selected, otherwise render spinner or content
        !isFileSelected ?
          <FileForm 
            setData={setData} 
            setIsLoading={setIsLoading} 
            setIsFileSelected={setIsFileSelected} 
            dataDates={dataDates} 
            setDataDates={setDataDates} 
            setError={setError} 
          /> 
        : // Render spinner if file is still loading, otherwise render file contents and features
          ( isLoading ? 
              <div className='spinner'><Spinner animation='border' /></div>
            : <div>
                <Wrapper
                  data={data}
                  dataDates={dataDates}
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                  upwardTrend={upwardTrend}
                  priceChanges={priceChanges}
                  openingPrice={openingPrice}
                />
                <TrendModal 
                  showTrend={showTrend} 
                  setShowTrend={setShowTrend} 
                  bullishTrend={bullishTrend} 
                  selectedDates={selectedDates} 
                />
                <VolumeModal 
                  showVolume={showVolume} 
                  setShowVolume={setShowVolume} 
                  copyData={copyData} 
                />
                <OpeningPriceModal 
                  showOpeningPrice={showOpeningPrice} 
                  setShowOpeningPrice={setShowOpeningPrice} 
                  copyData={copyData} 
                />
              </div>
          )
      }
    </div>
  );
}
