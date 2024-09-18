import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Article, Nut, X } from "@phosphor-icons/react";
import { Button } from "@nextui-org/button";

import logo from "@/public/icon.png";
import { WorkT } from "@/types";
import { WorkLinks } from "@/app/works/_components/work-link";

export const WorkDetailsModal: React.FC<{
  work: WorkT;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}> = ({ isOpen, onOpenChange, work }) => {
  return (
    <Modal
      backdrop={"blur"}
      classNames={{
        wrapper: "",
        base: "absolute border border-primary-900 bg-background right-pad top-pad bottom-pad no-scrollbar h-auto max-h-full max-w-[280px] md:max-w-md",
        header:
          "text-xl md:text-2xl font-medium text-foreground px-pad pt-pad flex items-center justify-between",
        closeButton: "hidden",
        body: "no-scrollbar text-primary-600 text-sm lg:text-base px-pad pb-pad gap-4",
      }}
      isOpen={isOpen}
      placement="top"
      radius="none"
      scrollBehavior="inside"
      size="full"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h1>{work.title}</h1>
              <Button
                isIconOnly={true}
                size={"sm"}
                variant={"light"}
                onPress={onClose}
              >
                <X className={"text-lg md:text-2xl"} weight={"bold"} />
              </Button>
            </ModalHeader>
            <ModalBody>
              <p className="leading-relaxed">{work.brief}</p>
              <div className={"rounded-xl"}>
                {work.image ? (
                  <Image
                    alt={work.image.alt}
                    className={"h-40 md:h-56"}
                    isZoomed={true}
                    radius="lg"
                    src={work.image.url}
                    width="auto"
                  />
                ) : (
                  <NextImage
                    alt="Logo"
                    className="h-40 md:h-56 w-full object-contain bg-primary-50 p-10 rounded-xl "
                    sizes="100vw"
                    src={logo}
                  />
                )}
              </div>
              <div>
                <div className={"flex items-center my-2 gap-3"}>
                  <Article size={20} weight={"bold"} />
                  <h3 className="font-medium text-base md:text-lg leading-none">
                    About
                  </h3>
                </div>
                <p className="leading-relaxed">{work.description}</p>
              </div>
              <div>
                <div className={"flex items-center my-2 gap-3"}>
                  <Nut size={20} weight={"bold"} />
                  <h3 className="font-medium text-base md:text-lg leading-none">
                    Tools
                  </h3>
                </div>
                <ul className={"flex flex-row flex-wrap gap-2"}>
                  {work.tools.map((tool, index) => (
                    <li
                      key={index}
                      className={
                        "flex after:content-['•'] last:after:content-['']"
                      }
                    >
                      <p className={"mr-1.5"}>{tool}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 md:mt-5 lg:mt-6">
                <WorkLinks
                  gap={"gap-3"}
                  iconSize={20}
                  iconWeight="bold"
                  isVertical={true}
                  links={work.links.items}
                  textSize="text-base md:text-lg"
                  textWeight="bold"
                />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
