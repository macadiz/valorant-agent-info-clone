import { FC, useState } from "react";
import { PageInfoProps } from "./types";

import "./PageInfo.css";
import Modal from "../Modal";
import { constants } from "./constants";

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
            {constants.tools.map((tool) => {
              return (
                <li>
                  <a href={tool.link} target="_blank" rel="noreferrer">
                    {tool.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default PageInfo;
