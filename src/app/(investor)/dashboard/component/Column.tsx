import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const Columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("website", {
    header: "Website",
    cell: (info) => (
      <a
        href={`https://${info.getValue()}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {info.getValue()}
      </a>
    ),
  }),
  columnHelper.accessor("investmentIndustry", {
    header: "Investment Industry",
    cell: (info) => (
      <span className={`badge badge-${info.getValue()}`}>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("investmentGeographies", {
    header: "Investment Geographies",
    cell: (info) => (
      <span className="badge badge-purple">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("dealsIn5Years", {
    header: "# of Deals in 5 years",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dealSize", {
    header: "Deal Size ($M)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("primaryContact", {
    header: "Primary Contact",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <span className="badge badge-gray">{info.getValue()}</span>,
  }),
  columnHelper.accessor("match", {
    header: "Match",
    cell: (info) => (
      <div className="flex items-center">
        <span>{info.getValue()}</span>
        <div className="ml-2 rounded-full border border-green-600 p-2 text-green-600">
          {info.getValue()}%
        </div>
      </div>
    ),
  }),
];
