import React from 'react';

export const Table = ({ className = '', children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={`bg-bg-soft/40 border-b border-gray-100 ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={`border-b border-gray-100/50 transition-colors hover:bg-bg-soft/50 group ${className}`} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ className = '', children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={`h-14 px-6 text-left align-middle font-bold text-gray-400 uppercase tracking-wider text-[11px] [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </th>
);

export const TableCell = ({ className = '', children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`px-6 py-4 align-middle text-text-slate font-medium [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </td>
);
