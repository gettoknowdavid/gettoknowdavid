"use client";

import React, { FC } from "react";
import { SwitchProps } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Radio, RadioGroup, RadioProps } from "@nextui-org/radio";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  return (
    <RadioGroup
      classNames={{ wrapper: "flex flex-row gap-6" }}
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
        label: "text-xs leading-none",
        wrapper: `rounded-none w-3 h-3 `,
        control: `rounded-none w-full h-full`,
      }}
    >
      {children}
    </Radio>
  );
};
