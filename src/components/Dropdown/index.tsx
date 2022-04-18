import { FC, ReactNode, useEffect, useRef } from "react";
import { Container, LinksContainer } from "./styles";

interface IProps {
  activateElement: ReactNode;
  links: { element: ReactNode; onClick: () => void }[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: FC<IProps> = ({
  isOpen,
  setIsOpen,
  activateElement,
  links,
}) => {
  const containerRef = useRef(null) as any;

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <Container ref={containerRef}>
      {activateElement}
      {isOpen && (
        <LinksContainer>
          {links.map((link, index) => (
            <div
              key={index}
              onClick={() => {
                link.onClick();
                setIsOpen(false);
              }}
            >
              {link.element}
            </div>
          ))}
        </LinksContainer>
      )}
    </Container>
  );
};

export default Dropdown;
