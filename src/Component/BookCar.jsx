import React, { useState } from 'react';
import { FaTrash, FaSuitcaseRolling, FaChild, FaAccessibleIcon } from 'react-icons/fa';

const BookCar = () => {
  const [serviceType, setServiceType] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [stops, setStops] = useState([]);
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [numPassengers, setNumPassengers] = useState(1);
  const [luggageCount, setLuggageCount] = useState(0);
  const [addChildSeat, setAddChildSeat] = useState(false);
  const [childSeats, setChildSeats] = useState([]);
  const [accessible, setAccessible] = useState(false);
  const [returnAtDiffLocation, setReturnAtDiffLocation] = useState(false);
  const [returnLocation, setReturnLocation] = useState('');

  const handleServiceChange = (event) => {
    setServiceType(event.target.value);
    // Reset fields based on selected service
    if (event.target.value !== 'AIRPORT PICK UP') {
      setReturnAtDiffLocation(false);
      setReturnLocation('');
    }
  };

  const handleAddStop = () => {
    setStops([...stops, '']);
  };

  const handleStopChange = (index, value) => {
    const newStops = stops.slice();
    newStops[index] = value;
    setStops(newStops);
  };

  const handleRemoveStop = (index) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const handleAddChildSeat = () => {
    setAddChildSeat(!addChildSeat);
    if (!addChildSeat) {
      setChildSeats([...childSeats, { type: '', quantity: 1 }]);
    }
  };

  const handleChildSeatChange = (index, field, value) => {
    const newChildSeats = childSeats.slice();
    newChildSeats[index][field] = value;
    setChildSeats(newChildSeats);
  };

  const handleRemoveChildSeat = (index) => {
    const newChildSeats = childSeats.filter((_, i) => i !== index);
    setChildSeats(newChildSeats);
  };

  const handleChildSeatTypeChange = (index, value) => {
    handleChildSeatChange(index, 'type', value);
  };

  const handleChildSeatQuantityChange = (index, value) => {
    handleChildSeatChange(index, 'quantity', value);
  };

  const handleAccessibleChange = () => {
    setAccessible(!accessible);
  };

  const handleReturnAtDiffLocationChange = () => {
    setReturnAtDiffLocation(!returnAtDiffLocation);
  };

  return (
    <form className="space-y-4 p-4">
      {/* Dropdown */}
      <div className="mb-4">
        <label htmlFor="service" className="block text-lg font-medium text-gray-700">
          Select Service Type
        </label>
        <select
          id="service"
          value={serviceType}
          onChange={handleServiceChange}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>-- Please choose an option --</option>
          <option value="AIRPORT DROP OFF">AIRPORT DROP OFF</option>
          <option value="AIRPORT PICK UP">AIRPORT PICK UP</option>
          <option value="HOURLY/AS DIRECTED">HOURLY/AS DIRECTED</option>
          <option value="POINT TO POINT">POINT TO POINT</option>
        </select>
      </div>

      {/* Pickup Date and Time */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
            Pickup Date
          </label>
          <input
            id="pickupDate"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
            Pickup Time
          </label>
          <input
            id="pickupTime"
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Pickup Location */}
      <div>
        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
          Pickup Location
        </label>
        <input
          id="pickupLocation"
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Add Stop */}
      {(serviceType === 'HOURLY/AS DIRECTED' || serviceType === 'POINT TO POINT' || serviceType ==='AIRPORT DROP OFF' || serviceType === 'AIRPORT PICK UP') && (
        <div>
          <button
            type="button"
            onClick={handleAddStop}
            className="text-indigo-600 hover:text-indigo-500"
          >
            + Add Stop
          </button>
          {stops.map((stop, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={stop}
                onChange={(e) => handleStopChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={`Stop ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveStop(index)}
                className="ml-2 text-red-600 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop Off Location */}
      {(serviceType === 'AIRPORT DROP OFF' || serviceType === 'POINT TO POINT'  || serviceType === 'AIRPORT PICK UP') && (
        <div>
          <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-700">
            Drop Off Location
          </label>
          <input
            id="dropOffLocation"
            type="text"
            value={dropOffLocation}
            onChange={(e) => setDropOffLocation(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
         
        </div>
      )}


      <div>
      {serviceType === 'HOURLY/AS DIRECTED' && (
            <div className="mt-2 flex items-center">
              <input
                id="returnAtDiffLocation"
                type="checkbox"
                checked={returnAtDiffLocation}
                onChange={handleReturnAtDiffLocationChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="returnAtDiffLocation" className="ml-2 text-sm font-medium text-gray-700">
                Return at different location
              </label>
              {returnAtDiffLocation && (
                <div className="mt-2">
                  <label htmlFor="returnLocation" className="block text-sm font-medium text-gray-700">
                    Return Location
                  </label>
                  <input
                    id="returnLocation"
                    type="text"
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              )}
            </div>
          )}
      </div>

      {/* Number of Passengers */}
      <div>
        <label htmlFor="numPassengers" className="block text-sm font-medium text-gray-700">
          Number of Passengers
        </label>
        <div className="flex items-center">
          <FaChild className="text-gray-500 mr-2" />
          <button
            type="button"
            onClick={() => setNumPassengers(numPassengers > 1 ? numPassengers - 1 : 1)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            -
          </button>
          <input
            id="numPassengers"
            type="text"
            value={numPassengers}
            readOnly
            className="mx-2 w-16 text-center p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => setNumPassengers(numPassengers + 1)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            +
          </button>
        </div>
      </div>

      {/* Luggage Count */}
      <div>
        <label htmlFor="luggageCount" className="block text-sm font-medium text-gray-700">
          Luggage Count
        </label>
        <div className="flex items-center">
          <FaSuitcaseRolling className="text-gray-500 mr-2" />
          <button
            type="button"
            onClick={() => setLuggageCount(luggageCount > 0 ? luggageCount - 1 : 0)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            -
          </button>
          <input
            id="luggageCount"
            type="text"
            value={luggageCount}
            readOnly
            className="mx-2 w-16 text-center p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => setLuggageCount(luggageCount + 1)}
            className="text-indigo-600 hover:text-indigo-500"
          >
            +
          </button>
        </div>
      </div>

      {/* Add Child Seat */}
      {serviceType === 'AIRPORT DROP OFF' && (
        <div>
          <button
            type="button"
            onClick={handleAddChildSeat}
            className="text-indigo-600 hover:text-indigo-500"
          >
            + Add Child Seat
          </button>
          {addChildSeat && childSeats.map((seat, index) => (
            <div key={index} className="flex items-center mt-2">
              <select
                value={seat.type}
                onChange={(e) => handleChildSeatTypeChange(index, e.target.value)}
                className="p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Seat Type</option>
                <option value="Rear Facing">Rear Facing</option>
                <option value="Forward Facing">Forward Facing</option>
                <option value="Booster Seat">Booster Seat</option>
              </select>
              <button
                type="button"
                onClick={() => handleChildSeatQuantityChange(index, seat.quantity > 1 ? seat.quantity - 1 : 1)}
                className="text-indigo-600 hover:text-indigo-500 ml-2"
              >
                -
              </button>
              <input
                type="text"
                value={seat.quantity}
                readOnly
                className="mx-2 w-16 text-center p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => handleChildSeatQuantityChange(index, seat.quantity + 1)}
                className="text-indigo-600 hover:text-indigo-500"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleRemoveChildSeat(index)}
                className="ml-2 text-red-600 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Accessible */}
      <div className="flex items-center mt-2">
        <input
          id="accessible"
          type="checkbox"
          checked={accessible}
          onChange={handleAccessibleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="accessible" className="ml-2 text-sm font-medium text-gray-700">
          <FaAccessibleIcon className="inline mr-1" /> Accessible
        </label>
      </div>

      {/* Select Vehicle Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Select Vehicle
      </button>
    </form>
  );
};

export default BookCar;
