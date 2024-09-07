import * as React from "react";
import { Selects } from "./Selects";

export function YearSelects() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    (1900 + i).toString()
  );

  const yearOptions = years.map((year) => ({ value: year, label: year }));

  const [selectedYear, setSelectedYear] = React.useState<string>("");

  return (
    <div className="w-[240px]">
      <Selects
        className="w-full"
        options={yearOptions}
        placeholder="Select a year"
        value={selectedYear}
        onChange={(value: string) => setSelectedYear(value)}
      />
    </div>
  );
}
