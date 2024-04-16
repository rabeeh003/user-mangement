import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoonStar, SunMoon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setDark, setLight } from "@/redux/Them";

function TheamBtn() {

  const {currentThem} = useSelector((state) => state.them)
  const dispatch = useDispatch()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary" >{
          currentThem === "light" ? (<MoonStar />) : (<SunMoon />)
        }</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Themes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={currentThem}>
          <DropdownMenuRadioItem value="light"><span onClick={()=>dispatch(setLight())}>Light</span></DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark"><span onClick={()=>dispatch(setDark())}>Dark</span></DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="device">Device</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TheamBtn;
