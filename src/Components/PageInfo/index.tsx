import { FC, useState } from "react";
import { PageInfoProps } from "./types";

import "./PageInfo.css";
import Modal from "../Modal";

const PageInfo: FC<PageInfoProps> = ({ selectedAgent }) => {
  const firstGradientColor = `#${selectedAgent?.backgroundGradientColors[0]}`;

  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);

  const onToolsModalOpen = () => {
    setIsToolsModalOpen(true);
  };

  const onToolsModalClose = () => {
    setIsToolsModalOpen(false);
  };

  return (
    <>
      <div className="page-info">
        Developed with ❤️ with the help of{" "}
        <button
          className="link-button"
          style={{ color: firstGradientColor }}
          onClick={onToolsModalOpen}
        >
          this tools
        </button>{" "}
        by{" "}
        <a
          href="https://github.com/macadiz"
          style={{ color: firstGradientColor }}
        >
          @macadiz
        </a>
        <br />
        This is not an official site and it's not endorsed with Riot Games in
        any way. Riot Games, and all associated properties are trademarks or
        registered trademarks of Riot Games, Inc.
      </div>
      <Modal isOpen={isToolsModalOpen} onClose={onToolsModalClose}>
        <div className="thanks-to-container">
          <h1>Tools I used to build this page</h1>
          <ul>
            <li>
              <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                React
              </a>
            </li>
            <li>
              <a
                href="https://fonts.google.com/specimen/Anton"
                target="_blank"
                rel="noreferrer"
              >
                Google fonts - Anton font
              </a>
            </li>
            <li>
              <a
                href="https://fonts.google.com/icons"
                target="_blank"
                rel="noreferrer"
              >
                Google fonts - Material Icons
              </a>
            </li>
            <li>
              <a
                href="https://valorant-api.com/"
                target="_blank"
                rel="noreferrer"
              >
                Valorant-API
              </a>
            </li>
            <li>
              <a
                href="https://icons8.com/icon/aUZxT3Erwill/valorant"
                target="_blank"
                rel="noreferrer"
              >
                Valorant icon - Icons8
              </a>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default PageInfo;
