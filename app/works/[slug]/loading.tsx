import React from "react";
import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <section className="pt-pad-4x md:pt-pad-3x lg:pt-pad-4x h-full w-full relative">
      <div className="w-full basis-[25%] p-pad fixed bottom-0 top-pad-4x">
        <div className="h-full w-full block place-content-center text-center p-pad">
          <Spinner color="secondary" size="lg" />
        </div>
      </div>
    </section>
  );
}
