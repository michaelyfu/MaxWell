"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";

function Home() {
  useEffect(() => {
    // Register A-Frame component
    if (typeof AFRAME === "undefined") {
      AFRAME.registerComponent("bounding-box", {
        init: function () {
          this.hand = document.getElementById("rightHand");
          this.box = document.getElementById("rightHandBox");
        },
        tick: function () {
          if (!this.hand.object3D) return;
          let handPosition = this.hand.object3D.position;
          this.box.object3D.position.set(
            handPosition.x,
            handPosition.y,
            handPosition.z
          );
          this.box.setAttribute("scale", "0.3 0.7 0.3");
        },
      });
    }

    // Image and instruction arrays
    const images = [
      "https://cdn.glitch.global/6faaa5da-4445-41a6-a344-b40532ac89d4/fbe7109f-661f-4fe5-9334-c0ec6bd372ad.image.png?v=1738467909814",
      "https://cdn.glitch.global/6faaa5da-4445-41a6-a344-b40532ac89d4/8b27cc74-acc4-4d77-b46c-be19c5cc5775.image.png?v=1738468312409",
      "https://cdn.glitch.global/6faaa5da-4445-41a6-a344-b40532ac89d4/104a46ed-95c1-4afd-8d1b-0a4e51cd248c.image.png?v=1738468391948",
      "https://cdn.glitch.global/6faaa5da-4445-41a6-a344-b40532ac89d4/e1e9fd66-0cd2-45e2-8c0c-62fa281ce435.image.png?v=1738468531870",
    ];
    const instructions = [
      "Expose the VR headset to the burn. Let it analyze whether it's first, second, or a third-degree burn.",
      "If you are wearing any rings or bracelets, remove them due to prevent further damage to your burn.",
      "If the burn is minor, run cool water over the burn for 10-15 minutes. AVOID USING COLD WATER - this can damage the skin around the burn.",
      "Wash your hands with soap and water to clean the burn and prevent infection. Apply an antibiotic like Neosporin when you are done to keep the burn clean.",
    ];

    let counter = 0;

    // Set initial text after timeout
    setTimeout(() => {
      const textEl = document.querySelector("#my-text");
      if (textEl) {
        textEl.setAttribute(
          "value",
          "Diagnostics complete. Click here for treatment options"
        );
      }
    }, 8000);

    // Add click handler
    const button = document.querySelector("#ar-button");
    if (button) {
      button.addEventListener("click", function () {
        const textEl = document.querySelector("#my-text");
        const imageEl = document.querySelector("#my-image");

        if (textEl) textEl.setAttribute("value", instructions[counter]);
        if (imageEl) {
          imageEl.setAttribute("src", images[counter]);
          imageEl.setAttribute("width", "5");
          imageEl.setAttribute("height", "2.5");
        }

        if (counter < instructions.length - 1) {
          counter++;
        }
      });
    }

    // Add bounding-box component to rightHand
    const rightHand = document.getElementById("rightHand");
    if (rightHand) {
      rightHand.setAttribute("bounding-box", "");
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <title>My Next.js VR Experience</title>
      <Script src="https://aframe.io/releases/1.2.0/aframe.min.js" />

      <a-scene
        xrweb="mode: immersive-ar; requiredFeatures: hit-test; optionalFeatures: dom-overlay; overlayElement: #overlay"
        xr-mode-ui="enabled: true; enterAREnabled: true; XRMode: ar;"
        renderer="colorManagement: true; antialias: true; foveationLevel: 1"
        embedded
      >
        <a-entity
          id="leftHand"
          hand-tracking-controls="hand: left; modelColor: #ffffff; modelOpacity: 0.1; modelStyle: mesh"
          hand-tracking-grab-controls="hand: left; hoverEnabled: true; hoverColor: #538df1"
        >
          <a-box
            id="leftHandBox"
            color="red"
            opacity="0.5"
            width="0.1"
            height="0.02"
            depth="0.1"
            position="0 .01 -.02"
          ></a-box>
        </a-entity>

        <a-entity
          id="rightHand"
          hand-tracking-controls="hand: right; modelColor: #ffffff; modelOpacity: 0.1; modelStyle: mesh"
          hand-tracking-grab-controls="hand: right; hoverEnabled: true; hoverColor: #538df1"
        >
          <a-box
            id="rightHandBox"
            color="blue"
            opacity="0.5"
            width="0.1"
            height="0.02"
            depth="0.1"
            position="0 .01 -.02"
          ></a-box>
        </a-entity>

        <a-camera position="0 1.6 0">
          <a-cursor></a-cursor>
        </a-camera>

        <a-image
          id="my-image"
          src=""
          position="0 2.75 -5"
          width="0"
          height="0"
        ></a-image>

        <a-plane
          id="ar-button"
          position="0 1 -5"
          width="5"
          color="white"
          class="clickable"
        >
          <a-text
            id="my-text"
            value="loading..."
            width="5"
            align="center"
            position="0 0 0.01"
            color="black"
          ></a-text>
        </a-plane>
      </a-scene>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
