import React, { useRef } from "react";
import "./settings.css";
import Draggable from "react-draggable";
import { isSafariBrowser } from "../../helpers/browser";
import { IoCloseOutline } from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";
import Switch from "../../components/switch/Switch";

const Settings = () => {
  const nodeRef = useRef(null);
  const { setShowSettings, showSettings, settingsConfig, setSettingsConfig } = useAppContext();

  const handleSwitchChange = (setting) => {
    const updatedSettingsConfig = { ...settingsConfig };
    if (setting === "todoList" || setting === "calendar") {
      if (setting === "todoList") {
        updatedSettingsConfig.fadeAway.todoList = !updatedSettingsConfig.fadeAway.todoList;
      } else if (setting === "calendar") {
        updatedSettingsConfig.fadeAway.calendar = !updatedSettingsConfig.fadeAway.calendar;
      }
    }
    if (setting === "hideInterface") {
      updatedSettingsConfig.hideInterface = !updatedSettingsConfig.hideInterface;
    }
    setSettingsConfig(updatedSettingsConfig);
    localStorage.setItem("settingsConfig", JSON.stringify(updatedSettingsConfig));
  };
  return (
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div
        ref={nodeRef}
        className="--widget-container melofi__settings"
        style={{ display: showSettings ? "flex" : "none" }}
      >
        <div id="handle" className="melofi__settings_handle" />
        <div id="handle" className="melofi__settings_header">
          <p className="melofi__settings_title">SETTINGS</p>
          <IoCloseOutline
            size={33}
            color="var(--color-secondary)"
            onClick={() => setShowSettings((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="melofi__settings_content">
          <div className="melofi__settings_section_title">
            <p style={{ fontSize: 21 }}>Fade Away</p>
            <p style={{ fontSize: 12, color: "var(--color-secondary)", width: "95%" }}>
              You can choose if widgets fade into the background, when the mouse is not hovering
              over it.
            </p>
          </div>
          <div className="melofi__settings_switch_container">
            <div className="melofi_settings_switch">
              <p style={{ fontSize: 18, marginBottom: 0 }}>To-do list</p>
              <Switch
                checked={settingsConfig.fadeAway.todoList}
                onChange={() => handleSwitchChange("todoList")}
              />
            </div>
            <div className="melofi_settings_switch">
              <p style={{ fontSize: 18, marginBottom: 0 }}>Calendar</p>
              <Switch
                checked={settingsConfig.fadeAway.calendar}
                onChange={() => handleSwitchChange("calendar")}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              width: "100%",
              backgroundColor: "var(--color-secondary-opacity)",
              height: 2,
              alignSelf: "center",
            }}
          />
          <div className="melofi__settings_section_title" style={{ marginTop: 25 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="melofi_settings_switch" style={{ fontSize: 18 }}>
                Hide interface
              </p>
              <Switch
                checked={settingsConfig.hideInterface}
                onChange={() => handleSwitchChange("hideInterface")}
              />
            </div>
            <p style={{ fontSize: 12, color: "var(--color-secondary)", width: "95%" }}>
              You can choose to hide the interface after 15 seconds of inactivity.
            </p>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Settings;
