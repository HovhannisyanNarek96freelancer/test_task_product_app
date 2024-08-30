"use client";

import {
    ColumnDef,
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    VisibilityState,
    ColumnResizeMode,
    ColumnResizeDirection
} from "@tanstack/react-table";
import {useMemo, useState} from "react";
import { Product } from "@/types";
import { products } from "@/mockData";
import Image from "next/image";

export const ProductTable = () => {
    const [data, _setData] = useState<Product[]>(products);
    const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({'name': true});
    const [columnResizeMode, _setColumnResizeMode] = useState<ColumnResizeMode>('onChange');
    const [columnResizeDirection, _setColumnResizeDirection] = useState<ColumnResizeDirection>('ltr');

    const columns = useMemo<ColumnDef<Product>[]>(() => [
        {
            accessorKey: 'id',
            header: () => 'ID',
            cell: (info) => <div className="text-center">{info.getValue()}</div>,
        },
        {
            accessorKey: 'name',
            header: () => 'Product Name',
            cell: (info) => <div className="text-center">{info.getValue()}</div>,
        },
        {
            accessorKey: 'price',
            header: () => 'Price',
            cell: (info) => <div className="text-center">{info.getValue()}</div>,
            sortDescFirst: true,
        },
        {
            accessorKey: 'quality',
            header: () => 'Quality',
            cell: (info) => <div className="text-center">{info.getValue()}</div>,
            sortDescFirst: true,
        },
        {
            accessorKey: 'description',
            header: () => 'Description',
            sortDescFirst: true,
        },
        {
            accessorKey: 'imageUrl',
            header: () => 'Image',
            cell: (info) => (
                <div className="flex justify-center">
                    <Image
                        src={info.getValue()}
                        alt={info.row.original.name}
                        width={100}
                        height={100}
                    />
                </div>
            ),
            enableSorting: false,
        },
    ], []);


    const table = useReactTable<Product>({
        data,
        columns,
        state: { sorting, columnVisibility },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode,
        columnResizeDirection,
    });

    return (
        <div className="overflow-x-auto md:overflow-x-hidden m-6">
            <div className="inline-block border border-black shadow rounded my-6">
                {table.getAllLeafColumns().map(column => (
                    <div key={column.id} className="px-1">
                        <label>
                            <input
                                type="checkbox"
                                className="mr-1"
                                checked={column.getIsVisible()}
                                onChange={column.getToggleVisibilityHandler()}
                                disabled={column.id === 'name'}
                            />
                            {flexRender(column.columnDef.header, { column })}
                        </label>
                    </div>
                ))}
            </div>
            <table
                {...{
                    className: "min-w-full",
                    style: {
                        width: table.getCenterTotalSize(),
                    },
                }}
            >
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="p-2" style={{ width: header.getSize() }}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        className={`cursor-pointer select-none ${header.column.getCanSort() ? 'underline' : ''}`}
                                        onClick={header.column.getToggleSortingHandler()}
                                        title={header.column.getCanSort() ? (header.column.getIsSorted() === 'asc' ? 'Sort descending' : 'Sort ascending') : undefined}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽') : ''}
                                    </div>
                                )}
                                <div
                                    {...{
                                        onDoubleClick: () => header.column.resetSize(),
                                        onMouseDown: header.getResizeHandler(),
                                        onTouchStart: header.getResizeHandler(),
                                        className: `resizer ${
                                            table.options.columnResizeDirection
                                        } ${
                                            header.column.getIsResizing() ? 'isResizing' : ''
                                        }`,
                                        role: 'separator',
                                        style: {
                                            transform:
                                                columnResizeMode === 'onEnd' &&
                                                header.column.getIsResizing()
                                                    ? `translateX(${
                                                        (table.options.columnResizeDirection ===
                                                        'rtl'
                                                            ? -1
                                                            : 1) *
                                                        (table.getState().columnSizingInfo
                                                            .deltaOffset ?? 0)
                                                    }px)`
                                                    : '',
                                        },
                                    }}
                                />
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="p-2" style={{ width: cell.column.getSize() }}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
