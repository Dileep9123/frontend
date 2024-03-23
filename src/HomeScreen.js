import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function HomeScreen(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [dest, setDest] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    console.log(new Date());
    setSelectedDate(today);
  }, []);
    const [valid, setValid] = useState(false);

  const closeModel = () => setShowModel(false);

  const [formData, setFormData] = useState({
    from : '',
    to : '',
    date:'',
    class:'',
    person:''
  });

  const [validationStatus, setValidationStatus] = useState({
   from : false,
   to : false,
   date : false,
   class:false,
   person:false
  });

  console.log(location.state);

  const classesArray = [
    { id: 1, label: 'AC Class' },
    { id: 2, label: 'Sleeper' },
    { id: 3, label: 'general' },
    // Add more options as needed
];

const genderArray = [
    { id: 1, label: 'Ladies' },
    { id: 2, label: 'Lower Berth/Senior Citizen' },
    { id: 3, label: 'person with disability' },
    // Add more options as needed
];

const stationArray = [
    { id: '1001', label: 'secundarabad' },
    { id: '1002', label: 'banglore' },
    { id: '1003', label: 'guntakal' },
    {id: '1004', label: 'kurnool' }
    // Add more options as needed
];

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.isLogged === true) {
        setIsLogged(true);
        setUserData(location.state.userData);
        sessionStorage.setItem(
          "userData",
          JSON.stringify(location.state.userData)
        );
      }
    } else {
      const storedUserData = sessionStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setIsLogged(true);
        setUserData(parsedUserData);
      }
    }
  }, [location.state]);

 
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
};

const handleBlur = () => {
    const inputDate = selectedDate;
    const currentDate = new Date().toISOString().slice(0, 10);

    if (inputDate && inputDate >= currentDate) {
        setValidationStatus((prevData) => ({
            ...prevData,
            date: true
          }));
    } else {
        setValidationStatus((prevData) => ({
            ...prevData,
            date: false
          }));
        
    }
};
const [fromInputValue, setFromInputValue] = useState('');
const [toInputValue, setToInputValue] = useState('');
const [fromSuggestions, setFromSuggestions] = useState([]);
const [toSuggestions, setToSuggestions] = useState([]);

const handleFromInputChange = (e) => {
  const value = e.target.value;
  setFromInputValue(value);
  setFormData((prevData) => ({
    ...prevData,
    from : value,
  }));

  // Filter stations based on the input value prefix
  const filteredStations = stationArray.filter((station) =>
    station.label.toLowerCase().startsWith(value.toLowerCase()) && value.length > 0
  );
  setFromSuggestions(filteredStations);
};

const handleToInputChange = (e) => {
  const value = e.target.value;
  setToInputValue(value);
  setFormData((prevData) => ({
    ...prevData,
    to : value,
  }));

  // Filter stations based on the input value prefix
  
  const filteredStations = stationArray.filter((station) =>
    station.label.toLowerCase().startsWith(value.toLowerCase()) && value.length > 0
  );

  setToSuggestions(filteredStations);
};

const handleSelectFromStation = (selectedStation) => {
    console.log(selectedStation);
  setFromInputValue(selectedStation.label);
  setFormData((prevData) => ({
    ...prevData,
    from : selectedStation,
  }));
  setValidationStatus((prevData)=>({
    ...prevData,
    from : true
  }));
  setFromSuggestions([]);
};

const handleSelectToStation = (selectedStation) => {
  setToInputValue(selectedStation.label);
  setFormData((prevData) => ({
    ...prevData,
    to : selectedStation,
  }));

  setValidationStatus((prevData)=>({
    ...prevData,
    to : true
  }));
  setToSuggestions([]);
};

const handleFromInputBlur = (e) => {
    
    // Clear suggestions when focus is removed from "From" input field
    if(!fromInputValue) {
     
    setFromSuggestions([]);
    }
  };
  

  const handleToInputBlur = (e) => {
   
    // Clear suggestions when focus is removed from "To" input field
    if(!toInputValue)
    setToSuggestions([]);
  };

const handleChange =  (e) => {
    const { name, value } = e.target;


    setFormData((prevData) => ({
        ...prevData,
        [name] : [value],
      }));
}


const handleSubmit = (e)=>{
   e.preventDefault();

}

  



  return (
    <>
      <div className="home-screen">
        <div className="apply-window">
          <div className="search-form">
            <h2>Book Ticket</h2> <br />
            <div className="row gy-5">
              <div className="col col-md-7">

               <div className="row g-2">

                <div className="col-12">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className="fa-solid fa-location-arrow"></i>
                    </span>
                    <div className="form-floating">
                        <input
                        type="text"
                        className="form-control"
                        id="from"
                        name="from"
                        value={fromInputValue}
                        onChange={handleFromInputChange}
                        onBlur={handleFromInputBlur}
                        placeholder="Enter a station"
                        />
                        <label htmlFor="from">From</label>
                    </div>
                    {fromSuggestions.length > 0 && (
                        <ul className="list-group station-suggestions">
                        {fromSuggestions.map((station) => (
                            <li
                            key={station.id}
                            id={station.id}
                            className="list-group-item"
                            onClick={() => handleSelectFromStation(station)}
                            >
                            {station.label}
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
      
                </div>

                <div className="col-12">
                  <i className="fa-solid fa-right-left rotate90  left-right"></i>
                </div>

                <div className="col-12">
                <div className="input-group">
        <span className="input-group-text">
          <i className="fa-solid fa-location-dot"></i>
        </span>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="to"
            value={toInputValue}
            onChange={handleToInputChange}
            onBlur={handleToInputBlur}
            placeholder="Enter a station"
          />
          <label htmlFor="to">To</label>
        </div>
        {toSuggestions.length > 0 && (
          <ul className="list-group to-suggestions">
            {toSuggestions.map((station) => (
              <li
                key={station.id}
                className="list-group-item"
                onClick={() => handleSelectToStation(station)}
              >
                {station.label}
              </li>
            ))}
          </ul>
        )}
      </div>


                </div>
                </div>
              </div>
              <div className="col col-md-5">
                  <div className="row g-5">
                  <div className="col-12">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fa-solid fa-calendar-days"></i>
                            </span>
                            <div className="form-floating">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    value={selectedDate || today}
                                    onChange={handleDateChange}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="date">DD/MM/YYYY</label>
                            </div>
                            
                        </div>  
                    </div>
                
                    <div className="col-12">
                    <div className="input-group">
                            <span className="input-group-text">
                                <i className="fa-solid fa-briefcase"></i>
                            </span>
                            <div className="form-floating">
                                <select name="class" className="form-select" id="floatingSelectGrid" onChange={handleChange}>
                                    <option value="">All Classes</option>
                                    {classesArray.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="floatingSelectGrid">Class</label>
                            </div>
                        </div>
                    </div>
                    </div>
               
                </div>

                <div className="col-md-7">
                <div className="input-group">
                            <span className="input-group-text">
                                <i className="fa-solid fa-briefcase"></i>
                            </span>
                            <div className="form-floating">
                                <select name="person" className="form-select" id="floatingSelectGrid" onChange={handleChange}>
                                    <option value="">general</option>
                                    {genderArray.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="floatingSelectGrid">Class</label>
                            </div>
                        </div>
                </div>

                <div className="col-12">
                     <button className="search-button" name='submit' onClick={handleSubmit} type="submit">Search</button>
                </div>
            </div>
          </div>
        </div>


        <div className="heading-window">
          <div>
            <h1 style={{ fontSize: "3.5rem" }}>INDIAN RAILWAYS</h1>
            <p style={{ fontSize: "2.5rem" }}>
              Safety | Security | Punctuality
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
