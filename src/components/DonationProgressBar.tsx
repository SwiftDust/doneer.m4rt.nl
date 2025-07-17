import React from "react";
import { astroI18n, t } from "astro-i18n";

astroI18n.locale;

interface DonationProgressBarProps {
  current: number;
  goal: number;
}

export const DonationProgressBar: React.FC<DonationProgressBarProps> = ({
  current,
  goal,
}) => {
  const percent = Math.min(100, Math.max(0, (current / goal) * 100));
  return (
    <div className="relative flex h-15 w-full items-center overflow-hidden rounded-full bg-white">
      <div
        className="bg-primary-dark absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-in-out"
        style={{
          width: `${percent}%`,
        }}
      ></div>
      <div className="relative z-10 flex w-full items-center justify-between px-8">
        <span className="font-primary text-dark text-lg md:text-xl">
          {t("meta.currency")}
          {current}
        </span>
        <span className="text-primary-light font-primary text-base md:text-lg">
          {t("donationProgressBar.of")} {t("meta.currency")}
          {goal}
        </span>
      </div>
    </div>
  );
};
