"use client"

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";

export function DisableDraftMode(){
    const envirenment = useDraftModeEnvironment();
    const router = useRouter();


    if (envirenment!== "live" && envirenment !== "unknown") {
        return null;
    }

const handleClick = async() => {
  await fetch("/draft-mode/disable");
  router.refresh();
}

    return(
        <Button
        onClick={handleClick}
        className={"fixed bottom-4 right-4 px-4 py-2 z-50"}>
            Disable Draft Mode
        </Button>
    )
}