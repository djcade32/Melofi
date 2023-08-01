import React, { useEffect, useRef } from "react";
import "./menu.css";

import {
  MdOutlineMenu,
  MdSettings,
  BsFillInfoCircleFill,
  FaCommentDots,
  FaHandsHelping,
  FaUserAlt,
  FaMedal,
} from "../../imports/icons";
import { useAppContext } from "../../context/AppContext";
import NewFeature from "../newFeature/NewFeature";
import { useAuthContext } from "../../context/AuthContext";
import usePremiumStatus from "../../../stripe/usePremiumStatus";
import { createCheckoutSession } from "../../../stripe/createCheckoutSession";

const iconProps = {
  size: 15,
  color: "white",
  cursor: "pointer",
};

const linkStyle = {
  fontFamily: "var(--font-primary)",
  color: "white",
  fontSize: 16,
  fontWeight: 300,
};

const Menu = ({ isSleep, setNewMenuPopupVisible, newMenuPopupVisible }) => {
  const menuRef = useRef(null);
  const { user } = useAuthContext();
  const {
    showMenu,
    setShowMenu,
    setShowSettings,
    setShowAboutMelofi,
    setShowAuthModal,
    setShowAccount,
  } = useAppContext();
  const userIsPremium = usePremiumStatus(user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
  }, [isSleep]);

  const removeNewFeature = () => {
    setNewMenuPopupVisible(false);
    localStorage.setItem("new_menu_popup_status", true);
  };
  return (
    <div ref={menuRef} className="--nav-button" onClick={() => setShowMenu((prev) => !prev)}>
      <MdOutlineMenu size={20} color="white" />
      {showMenu && (
        <div className="melofi__menu_modal">
          {user ? (
            <div
              className="melofi__menu_modal_items"
              onClick={() => setShowAccount((prev) => !prev)}
            >
              <FaUserAlt {...iconProps} />
              <p>Account</p>
            </div>
          ) : (
            <div
              className="melofi__menu_modal_items"
              onClick={() => {
                setShowAuthModal((prev) => !prev);
                removeNewFeature();
              }}
            >
              <FaUserAlt {...iconProps} />
              {newMenuPopupVisible && <NewFeature />}
              <p>Login / Signup</p>
            </div>
          )}
          <div
            className="melofi__menu_modal_items"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <MdSettings {...iconProps} />
            <p>General settings</p>
          </div>
          {userIsPremium ? (
            <div className="melofi__menu_modal_items" onClick={() => {}}>
              <MdSettings {...iconProps} />
              <p>Manage Plan</p>
            </div>
          ) : (
            <div
              className="melofi__menu_modal_items"
              onClick={() => (user ? createCheckoutSession(user.uid) : setShowAuthModal(true))}
            >
              <FaMedal {...iconProps} />
              <p>Go Premium</p>
            </div>
          )}
          <a
            href="https://forms.gle/53SKQW27bXiwdcNW8"
            target="_blank"
            className="melofi__menu_modal_items"
            style={linkStyle}
          >
            <FaCommentDots {...iconProps} />
            Leave feedback
          </a>
          <a
            href="https://bmc.link/normancade"
            target="_blank"
            className="melofi__menu_modal_items"
            style={linkStyle}
          >
            <FaHandsHelping {...iconProps} />
            Support
          </a>
          <div
            className="melofi__menu_modal_items"
            onClick={() => setShowAboutMelofi((prev) => !prev)}
          >
            <BsFillInfoCircleFill {...iconProps} />
            <p>About Melofi</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
