"use client";

import React, { FC } from "react";
import { SwitchProps } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Radio, RadioGroup, RadioProps } from "@nextui-org/radio";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
  isVertical?: boolean;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ isVertical }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  return (
    <RadioGroup
      classNames={{
        wrapper: `flex ${isVertical ? "flex-col gap-8" : "flex-row gap-6"}`,
      }}
      color={"default"}
      size={"sm"}
      value={isSSR ? "light" : theme}
      onValueChange={setTheme}
    >
      <CustomRadio value="light">LIGHT</CustomRadio>
      <CustomRadio value="dark">DARK</CustomRadio>
    </RadioGroup>
  );
};

export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        label: "text-sm leading-none",
        wrapper: `rounded-none w-2.5 h-2.5 `,
        control: `rounded-none w-full h-full`,
      }}
    >
      {children}
    </Radio>
  );
};
