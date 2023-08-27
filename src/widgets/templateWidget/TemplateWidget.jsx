import "./templateWidget.css";
import Draggable from "react-draggable";
import { isSafariBrowser } from "../../helpers/browser";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FiPlus, IoCloseOutline } from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";
import Template from "./template";
import { useAuthContext } from "../../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import uuid from "react-uuid";
import { SOUNDS } from "../../data/sounds";
import { getWidgetDisplayPosition } from "../../helpers/common";

export default function TemplateWidget() {
  const nodeRef = useRef(null);

  const { db, user, userData } = useAuthContext();
  const {
    showTemplateWidget,
    setShowTemplateWidget,
    selectedPlaylist,
    currentSceneIndex,
    setShowAuthModal,
    openWidgets,
  } = useAppContext();

  const [templateList, setTemplateList] = useState([]);
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [addTemplateInput, setAddTemplateInput] = useState("");

  useEffect(() => {
    if (user) {
      getTemplates();
    }
  }, [userData]);

  const getTemplates = async () => {
    const docRef = doc(db, `users/${user.uid}`);
    try {
      const userSnapshot = await getDoc(docRef);
      if (userSnapshot.exists()) {
        userSnapshot.data()?.templates && setTemplateList(userSnapshot.data()?.templates);
      }
    } catch (error) {
      console.log("Error fetching user templates: ", error);
    }
  };

  const handleAddTemplate = async () => {
    if (addTemplateInput.trim() === "") {
      return;
    }

    let activeSoundsList = Object.values(SOUNDS).filter(({ soundVolume }) => soundVolume > 0);

    let newActiveSoundsList = [];
    activeSoundsList.map(({ sound, soundVolume }) =>
      newActiveSoundsList.push({ sound: sound, volume: soundVolume })
    );
    const docRef = doc(db, `users/${user.uid}`);
    const userSnapshot = await getDoc(docRef);
    if (userSnapshot.exists()) {
      let newTemplate = {
        id: uuid(),
        title: addTemplateInput,
        playlistIndex: selectedPlaylist.id,
        sceneIndex: currentSceneIndex,
        sounds: newActiveSoundsList,
      };
      let userData = {
        templates: [...templateList, newTemplate],
      };

      try {
        await updateDoc(docRef, userData);
        setShowAddTemplateModal(false);
        setAddTemplateInput("");
      } catch (error) {
        console.log("Error adding new template: ", error);
      }
    }
  };

  return (
    <Draggable nodeRef={nodeRef} bounds={isSafariBrowser() ? "" : ".fullscreen"} handle="#handle">
      <div
        className="--widget-container melofi__template"
        ref={nodeRef}
        style={{
          display: showTemplateWidget ? "flex" : "none",
          zIndex: 10 + getWidgetDisplayPosition(openWidgets, "TemplateWidget"),
        }}
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
        <div
          className="melofi__template_templatesContainer"
          style={{ opacity: showAddTemplateModal ? 0.4 : 1 }}
        >
          {user &&
            templateList.map((template, index) => <Template key={index} template={template} />)}
          {!user && (
            <div
              style={{
                margin: "auto",
                width: "50%",
              }}
            >
              <div
                className="melofi__template_premium_button"
                onClick={() => setShowAuthModal(true)}
              >
                <p style={{ textAlign: "center" }}>Log In | Sign Up</p>
              </div>
              <p style={{ textAlign: "center", fontSize: 16, lineHeight: 1.75 }}>
                to save current sounds, scenes, and playlist.
              </p>
            </div>
          )}
        </div>
        <div
          className="melofi__template_addButton"
          onClick={() => (!user ? () => {} : setShowAddTemplateModal(true))}
        >
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
        {showAddTemplateModal && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: "auto",
              zIndex: 10,
            }}
          >
            <div className="--widget-container melofi__template_addTemplate_modal">
              <p>Template Name</p>
              <input
                type="text"
                placeholder="Template Name"
                value={addTemplateInput}
                onChange={(e) => setAddTemplateInput(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{ cursor: "pointer", color: "var(--color-secondary)" }}
                  onClick={() => {
                    setShowAddTemplateModal(false);
                    setAddTemplateInput("");
                  }}
                >
                  Cancel
                </p>
                <p
                  style={{ cursor: "pointer", color: "var(--color-effect-opacity)" }}
                  onClick={handleAddTemplate}
                >
                  Add
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}
