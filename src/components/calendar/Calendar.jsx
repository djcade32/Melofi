import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Calendar as ReactCalendar } from "./imports";
import { AiOutlineGoogle, BsInfoCircle, IoCloseOutline } from "../../imports/icons";

import "./calendar.css";
import Draggable from "react-draggable";
import Tooltip from "../tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";
import CalendarItem from "./CalendarItem";

function Calendar() {
  const date = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let options = { weekday: "long", month: "long", day: "numeric", timeZone: timezone };
  const { setShowCalendar, showCalendar } = useAppContext();
  const nodeRef = useRef(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
    scope: "https://www.googleapis.com/auth/calendar",
  });

  useEffect(() => {
    if (user) {
      // fetchEvents();
    }
  }, [user]);

  // console.log("min time: ", date.toISOString());
  // console.log(
  //   "max time: ",
  //   new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 59).toISOString()
  // );
  // console.log("min time: ", new Date().toLocaleString("en-US", { timeZone: timezone }));

  // console.log("min time: ", new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString());
  //   useEffect(() => {
  //     if (user) {
  //       console.log("user: ", user);
  //       axios
  //         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         })
  //         .then((res) => {
  //           console.log("profile: ", res.data);
  //           setProfile(res.data);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const fetchEvents = async () => {
    const timeMin = date.toISOString();
    const timeMax = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      11,
      59
    ).toISOString();

    try {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      setEvents(response.data.items);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <Draggable nodeRef={nodeRef} bounds={".fullscreen"}>
      <div
        className="melofi__calendar"
        ref={nodeRef}
        style={{ display: showCalendar ? "flex" : "none" }}
      >
        <div className="melofi__calendar_header">
          <p className="melofi__calendar-date">{date.toLocaleDateString("en-US", options)}</p>
          <IoCloseOutline
            size={33}
            color="var(--color-secondary)"
            onClick={() => setShowCalendar((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {user ? (
          <div className="melofi__calendar-login-view">
            {/* <ReactCalendar onClickDay={(date) => fetchEvents(date)} /> */}
            {/* <ul>
            {events.map((event) => (
              <li key={event.id}>{event.summary}</li>
            ))}
          </ul> */}
            <div className="melofi__calendar-items">
              {events.map((event) => (
                <CalendarItem title={event.summary} startTime={""} endTime={""} />
              ))}
            </div>
          </div>
        ) : (
          /* <div className="meofi__calendar-google-button-contianer"> */
          <div className="melofi__calendar-signin-view">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <p>No events to view</p>
              <Tooltip text="Login into Google to view your Google Calendar task for today">
                <BsInfoCircle size={20} color="white" />
              </Tooltip>
            </div>
            <div className="melofi__calendar-google-button" onClick={() => login()}>
              <AiOutlineGoogle size={30} color="white" />
              <p>Continue with Google</p>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}
export default Calendar;
