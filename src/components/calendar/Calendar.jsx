import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineGoogle, BsInfoCircle, IoCloseOutline } from "../../imports/icons";

import "./calendar.css";
import Draggable from "react-draggable";
import Tooltip from "../tooltip/Tooltip";
import { useAppContext } from "../../context/AppContext";
import CalendarItem from "./CalendarItem";

function Calendar() {
  const nodeRef = useRef(null);
  const date = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeout = null;
  let options = { weekday: "long", month: "long", day: "numeric", timeZone: timezone };

  const { setShowCalendar, showCalendar } = useAppContext();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      setTokenExpiration(user.expires_in);
      // fetchEvents();
    }
  }, [user]);

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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setUser(codeResponse);
      localStorage.setItem("user", JSON.stringify(codeResponse));
    },
    onError: (error) => console.log("Login Failed:", error),
    scope: "https://www.googleapis.com/auth/calendar",
  });

  const logOut = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    clearTimeout(timeout);
  };

  const setTokenExpiration = (expires_in) => {
    timeout = setTimeout(() => {
      logOut();
    }, expires_in * 1000);
  };

  const convertISOTimestamp = (timestamp) => {
    const isoDate = new Date(timestamp);
    const convertedDate = isoDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return convertedDate[0] === "0" ? convertedDate.slice(1) : convertedDate;
  };

  const dateInPast = (endTime) => {
    const currentTime = new Date().getTime();
    const newEndTime = new Date(endTime).getTime();

    return currentTime > newEndTime;
  };

  const determineCalendarHeight = (event) => {
    switch (event.length) {
      case 0:
        return 200;
      case 1:
        return 200;
      case 2:
        return 250;

      default:
        return 370;
    }
  };

  return (
    <Draggable nodeRef={nodeRef} bounds={".fullscreen"}>
      <div
        className="melofi__calendar"
        ref={nodeRef}
        style={{ display: showCalendar ? "flex" : "none", height: determineCalendarHeight(events) }}
      >
        <div className="melofi__calendar_header">
          <p className="melofi__calendar-date">{date.toLocaleDateString("en-US", options)}</p>
          <div className="melofi__calendar-exit-button">
            <IoCloseOutline
              size={33}
              color="var(--color-secondary)"
              onClick={() => setShowCalendar((prev) => !prev)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {user ? (
          <div className="melofi__calendar-login-view">
            {events.length > 0 ? (
              <div className="melofi__calendar-items">
                {events.map(
                  (event) =>
                    event.summary && (
                      <CalendarItem
                        title={event.summary}
                        startTime={convertISOTimestamp(event?.start.dateTime)}
                        endTime={convertISOTimestamp(event?.end.dateTime)}
                        dateInPast={dateInPast(event?.end.dateTime)}
                      />
                    )
                )}
              </div>
            ) : (
              <div className="melofi__calendar-no-events">
                <p>No more events</p>
                <p>Your day is clear</p>
              </div>
            )}
          </div>
        ) : (
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
        {user && (
          <p className="melofi__calendar-disconnect-button" onClick={() => logOut()}>
            Disconnect account
          </p>
        )}
      </div>
    </Draggable>
  );
}
export default Calendar;
