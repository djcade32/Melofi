import "./templateWidget.css";
import Draggable from "react-draggable";
import { isSafariBrowser } from "../../helpers/browser";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FiPlus, IoCloseOutline } from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";
import Template from "./template";
import { useAuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

export default function TemplateWidget() {
  const nodeRef = useRef(null);

  const { db, user } = useAuthContext();
  const { showTemplateWidget, setShowTemplateWidget } = useAppContext();

  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    try {
      const userSnapshot = await getDoc(docRef);
      if (userSnapshot.exists()) {
        setTemplateList(userSnapshot.data().templates);
      }
    } catch (error) {
      console.log("Error fetching user templates: ", error);
    }
  };

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
          {templateList.map((template, index) => (
            <Template key={index} template={template} />
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
