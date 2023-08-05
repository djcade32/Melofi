import React from "react";
import "./template.css";

import { MdDelete, RiPlayListFill, MdLandscape, BsSoundwave } from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";
import { getIcon } from "../../helpers/icons";

const Template = ({ title, scene, playlist, sounds }) => {
  const soundsTooltip = (
    <div className="melofi_template_templatesContainer_template_settingsContainer_soundsTooltip">
      {sounds.map((sound) => getIcon(sound, { size: 15, color: "white" }))}
    </div>
  );
  return (
    <div className="melofi__template_templatesContainer_template">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: 18 }}>{title}</p>
        <MdDelete
          onMouseOver={({ target }) => (target.style.color = "white")}
          onMouseOut={({ target }) => (target.style.color = "var(--color-secondary")}
          size={22}
          className="melofi__template_templatesContainer_template_deleteIcon"
          color="var(--color-secondary"
        />
      </div>
      <div style={{ display: "flex", columnGap: 20, justifyContent: "space-between" }}>
        <Tooltip text={title}>
          <div className="melofi_template_templatesContainer_template_settingsContainer">
            <div style={{ display: "flex", alignItems: "center" }}>
              <RiPlayListFill size={20} color="var(--color-effect-opacity)" />
            </div>
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {playlist}
            </p>
          </div>
        </Tooltip>
        <Tooltip text="Neighborhood Cafe">
          <div className="melofi_template_templatesContainer_template_settingsContainer">
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdLandscape size={20} color="var(--color-effect-opacity)" />
            </div>
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {scene}
            </p>
          </div>
        </Tooltip>
        <Tooltip text={sounds.length > 3 && soundsTooltip}>
          <div
            className="melofi_template_templatesContainer_template_settingsContainer"
            style={{ columnGap: 0 }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsSoundwave size={20} color="var(--color-effect-opacity)" />
            </div>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-around",
                width: "100%",
                paddingLeft: 5,
              }}
            >
              {sounds.map((sound, index) => {
                if (index < 3) {
                  return getIcon(sound, { size: 15, color: "white" });
                }
              })}
            </div>
            {sounds.length > 3 && <p>...</p>}
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Template;
