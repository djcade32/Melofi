import React, { useEffect, useState } from "react";
import "./premiumModal.css";
import { useAppContext } from "../../context/AppContext";
import { getWidgetDisplayPosition } from "../../helpers/common";
import heroImg from "../../assets/scenes/girl-at-dusk_pic.webp";
import { IoCloseOutline, BsCheck2, BsInfoCircle } from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";
import { createCheckoutSession } from "../../../stripe/createCheckoutSession";
import { useAuthContext } from "../../context/AuthContext";

const premiumModal = () => {
  const { showPremiumModal, setShowPremiumModal, openWidgets } = useAppContext();
  const { user } = useAuthContext();

  const [selectedPriceModel, setSelectedPriceModel] = useState("Monthly");
  const [checkoutSessionLoading, setCheckoutSessionLoading] = useState(false);

  return (
    <div
      className="--widget-container melofi__premiumModal"
      style={{
        display: showPremiumModal ? "flex" : "none",
        zIndex: 10 + getWidgetDisplayPosition(openWidgets, "PremiumModal"),
        cursor: checkoutSessionLoading ? "progress" : "pointer",
      }}
    >
      <div className="melofi__premiumModal_heroImg" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="melofi__premiumModal_priceSwitchContainer">
          <div
            className="melofi__premiumModal_priceSwitchContainer_price"
            style={{
              backgroundColor: selectedPriceModel === "Monthly" && "var(--color-secondary)",
            }}
            onClick={() => setSelectedPriceModel("Monthly")}
          >
            <p>Pay Monthly</p>
          </div>
          <div
            className="melofi__premiumModal_priceSwitchContainer_price"
            style={{
              backgroundColor: selectedPriceModel === "Yearly" && "var(--color-secondary)",
            }}
            onClick={() => setSelectedPriceModel("Yearly")}
          >
            <p>Pay Yearly</p>
          </div>
        </div>
        <IoCloseOutline
          size={33}
          color="white"
          onClick={() => {
            setShowPremiumModal(false);
            setSelectedPriceModel("Monthly");
          }}
          style={{ cursor: "pointer", position: "absolute", right: 10, top: 10 }}
        />
      </div>

      <div className="melofi__premiumModal_content">
        <div>
          <p style={{ fontWeight: 500, textAlign: "center", marginBottom: 10, fontSize: 21 }}>
            🎉Elevate Your Melofi Experience with Premium! 🎉
          </p>
          <p
            style={{
              fontSize: 16,
              color: "var(--color-secondary)",
              textAlign: "center",
            }}
          >
            Experience an elevated journey of focus and creativity with Melofi Premium Membership,
            starting today.
          </p>
        </div>

        <div className="melofi__premiumModal_content_featuresContainer">
          <div className="melofi__premiumModal_content_featuresContainer_leftSide">
            <div className="melofi__premiumModal_content_feature">
              <BsCheck2 size={30} color="var(--color-effect)" />
              <p>🎵 Additional Lofi Tracks</p>
            </div>
            <div className="melofi__premiumModal_content_feature">
              <BsCheck2 size={30} color="var(--color-effect)" />
              <p>🌆 Additional Scenes</p>
            </div>
            <div className="melofi__premiumModal_content_feature">
              <BsCheck2 size={30} color="var(--color-effect)" />
              <p>🎧 Melofi Playlist</p>
              <Tooltip
                text="Curated Melofi playlist, carefully crafted to enhance your workflow."
                width="40ch"
              >
                <BsInfoCircle size={20} color="var(--color-secondary)" />
              </Tooltip>
            </div>
          </div>
          <div className="melofi__premiumModal_content_featuresContainer_rightSide">
            <div className="melofi__premiumModal_content_feature">
              <BsCheck2 size={30} color="var(--color-effect)" />
              <p>⏲️ Pomodoro Tasks</p>
              <Tooltip
                text="Boost your efficiency and stay on track with integrated Pomodoro tasks."
                width="40ch"
              >
                <BsInfoCircle size={20} color="var(--color-secondary)" />
              </Tooltip>
            </div>
            <div className="melofi__premiumModal_content_feature">
              <BsCheck2 size={30} color="var(--color-effect)" />
              <p>📋 Templates</p>
              <Tooltip
                text="Save your favorite sounds, scenes, and Melofi playlist as presets."
                width="40ch"
              >
                <BsInfoCircle size={20} color="var(--color-secondary)" />
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="melofi__premiumModal_content_footer">
          <p>
            <span style={{ fontWeight: "bold", fontSize: 24 }}>
              {selectedPriceModel === "Monthly" ? "$3.99" : "$2.99"}
            </span>
            /mo
          </p>
          <div
            className="melofi__premiumModal_content_footer_button"
            onClick={async () => {
              setCheckoutSessionLoading(true);
              await createCheckoutSession(user.uid, selectedPriceModel).then((result) =>
                setCheckoutSessionLoading(!result)
              );
            }}
          >
            <p>Go Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default premiumModal;
