import "./templateWidget.css";
import Draggable from "react-draggable";
import { isSafariBrowser } from "../../helpers/browser";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  FiPlus,
  IoCloseOutline,
  MdDelete,
  RiPlayListFill,
  MdLandscape,
  BsSoundwave,
  BsCloudRain,
  BsTree,
  SlSocialTwitter,
} from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";

const testList = ["Happy", "Study", "Sleepy", "Relaxing"];

export default function TemplateWidget() {
  const nodeRef = useRef(null);
  const { showTemplateWidget, setShowTemplateWidget } = useAppContext();

  return (
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div
        className="--widget-container melofi__template"
        ref={nodeRef}
        style={{ display: showTemplateWidget ? "flex" : "none" }}
      >
        <div
          id="handle"
          style={{
            cursor: "all-scroll",
            display: "flex",
            justifyContent: "space-between",
            height: 50,
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div style={{ cursor: "all-scroll", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: 21 }}>TEMPLATES</p>
          <IoCloseOutline
            size={33}
            color="var(--color-secondary)"
            onClick={() => setShowTemplateWidget(false)}
            cursor={"pointer"}
            style={{ zIndex: 10 }}
          />
        </div>
        <div className="melofi__template_templatesContainer">
          {testList.map((temp, index) => (
            <div key={index} className="melofi__template_templatesContainer_template">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: 18 }}>{temp} Vibes</p>
                <MdDelete
                  onMouseOver={({ target }) => (target.style.color = "white")}
                  onMouseOut={({ target }) => (target.style.color = "var(--color-secondary")}
                  size={22}
                  className="melofi__template_templatesContainer_template_deleteIcon"
                  color="var(--color-secondary"
                />
              </div>
              <div style={{ display: "flex", columnGap: 20 }}>
                <Tooltip text={temp}>
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
                      {temp}
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
                      Neighborhood Cafe
                    </p>
                  </div>
                </Tooltip>
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
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingLeft: 5,
                    }}
                  >
                    <BsCloudRain size={15} color="white" />
                    <BsTree size={15} color="white" />
                    <SlSocialTwitter size={15} color="white" />
                  </div>
                  <p>...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="melofi__template_addButton">
          <Tooltip text="Add template">
            <FiPlus
              size={33}
              color="white"
              style={{
                backgroundColor: "var(--color-secondary)",
                padding: 3,
                borderRadius: "100%",
                cursor: "pointer",
                zIndex: 10,
                outline: "1px solid var(--color-secondary)",
              }}
            />
          </Tooltip>
        </div>
      </div>
    </Draggable>
  );
}
