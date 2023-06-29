import Hero from "./components/Hero";
import SechduleManager from "./components/ScheduleManager";
import styles from "./styles/Home.module.scss";
import { FiMapPin } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import Slider from "@mui/material/Slider";
import TimeSelector from "./components/TimeSelector";

const facilitiesOptions = [
  "AC",
  "Smart Board",
  "Computers",
  "Projector",
  "Electronic Equipment",
  "Robotics",
];

const HomePage = () => {
  //states to open and close the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpaceSelector, setIsSpaceSelector] = useState(false);
  const [isDaySelector, setIsDaySelector] = useState(false);
  const [isTimeSelector, setIsTimeSelector] = useState(false);
  const menuRef = useRef();

  //close menu when clicked outside
  useEffect(() => {
    let handler = (e) => {
      if (
        e.target.id !== "actionBtn" &&
        !menuRef.current.contains(e.target) //if the click is on the modal
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  //action parameters

  // Initialize selectedDays state with array of indices //DaySelector
  const [selectedDays, setSelectedDays] = useState([1, 2, 3, 4, 5]);

  //TimeSelector
  const [startTime, setStartTime] = useState(8); // State for startTime
  const [endTime, setEndTime] = useState(17); // State for endTime

  //SpaceSelector
  const [capacity, setCapacity] = useState([0, 120]);
  const [selectedFacilities, setSelectedFacilities] =
    useState(facilitiesOptions);

  return (
    <div>
      <Hero
        spanText="Shared"
        title="Spaces"
        description="Check Availability and Reserve Spaces"
      >
        <div className={styles.actionBar}>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setIsMenuOpen(true);
              setIsSpaceSelector(true);
              setIsDaySelector(false);
              setIsTimeSelector(false);
            }}
            id="actionBtn"
          >
            <FiMapPin />
            Any Space
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setIsMenuOpen(true);

              setIsSpaceSelector(false);
              setIsDaySelector(true);
              setIsTimeSelector(false);
            }}
            id="actionBtn"
          >
            <LuCalendarDays />
            Any Day
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setIsMenuOpen(true);
              setIsSpaceSelector(false);
              setIsDaySelector(false);
              setIsTimeSelector(true);
            }}
            id="actionBtn"
          >
            <FaRegClock />
            Any Time
          </button>
        </div>
      </Hero>
      <div
        className={classNames(styles.menu, isMenuOpen && styles.active)}
        ref={menuRef}
      >
        {isSpaceSelector && (
          <SpaceSelector
            capacity={capacity}
            setCapacity={setCapacity}
            selectedFacilities={selectedFacilities}
            setSelectedFacilities={setSelectedFacilities}
          />
        )}
        {isDaySelector && (
          <DaySelector
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        )}
        {isTimeSelector && (
          <TimeSelector
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        )}
      </div>
      <SechduleManager
        selectedDays={selectedDays}
        startTime={startTime}
        endTime={endTime}
        capacity={capacity}
        selectedFacilities={selectedFacilities}
      />
    </div>
  );
};
const DaySelector = ({ selectedDays, setSelectedDays }) => {
  const dayOptions = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Handle checkbox change event
  const handleCheckboxChange = (event) => {
    const index = parseInt(event.target.value);

    if (selectedDays.includes(index)) {
      // If index is already in selectedDays, remove it
      setSelectedDays(selectedDays.filter((day) => day !== index));
    } else {
      // Otherwise, add index to selectedDays
      setSelectedDays([...selectedDays, index]);
    }
  };

  return (
    <div className={styles.options}>
      <div className={styles.optionLabel}>Days</div>
      <div className={classNames(styles.optionContent, styles.checkboxes)}>
        {dayOptions.map((day, index) => (
          <div key={index} className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              value={index} // Use index as checkbox value
              id={day}
              checked={selectedDays.includes(index)} // Check if index is in selectedDays
              onChange={handleCheckboxChange}
            />
            <label htmlFor={day}>{day}</label>{" "}
            {/* Use htmlFor instead of for */}
          </div>
        ))}
      </div>
    </div>
  );
};

const SpaceSelector = ({
  capacity,
  setCapacity,
  selectedFacilities,
  setSelectedFacilities,
}) => {
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedFacilities.includes(value)) {
      setSelectedFacilities(
        selectedFacilities.filter((facility) => facility !== value)
      );
    } else {
      setSelectedFacilities([...selectedFacilities, value]);
    }
  };
  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 120,
      label: 120,
    },
  ];

  return (
    <>
      <div className={styles.options}>
        <div className={styles.optionLabel}>Capacity</div>
        <div className={styles.optionContent}>
          <Slider
            value={capacity}
            onChange={(e, newValue) => setCapacity(newValue)}
            valueLabelDisplay="auto"
            marks={marks}
            min={0}
            max={120}
          />
        </div>
      </div>
      <hr />
      <div className={styles.options}>
        <div className={styles.optionLabel}>Facilities</div>
        <div className={classNames(styles.optionContent, styles.checkboxes)}>
          {facilitiesOptions.map((facility) => (
            <div key={facility} className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                value={facility}
                id={facility}
                checked={selectedFacilities.includes(facility)}
                onChange={handleCheckboxChange}
              />

              <label for={facility}>{facility}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
